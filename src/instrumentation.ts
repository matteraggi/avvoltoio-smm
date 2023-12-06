"use client"
import useSocketIo from "./app/useSocketio";

export function register() {
  console.log("registering instrumentation");
  useSocketIo();
}
