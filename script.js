import { check } from "k6";
import http from "k6/http";

export const options = {
  vus: 10,
  duration: "20s",
  thresholds: {
    http_req_duration: ["max<500"],
  },
};

export default function () {
  const headers = { "Content-Type": "application/json" };
  const payload = JSON.stringify({
    name: "Dog",
    status: "available",
  });

  const res = http.post("https://petstore.swagger.io/v2/pet", payload, {
    headers,
  });

  check(res, {
    "status was 200": (r) => r.status == 200,
    "response name same with payload": (r) =>
      JSON.parse(r.body)["name"] == JSON.parse(payload)["name"],
  });
}
