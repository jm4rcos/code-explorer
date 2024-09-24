import { NextRequest } from "next/server";

export function checkUserSession(req: NextRequest) {
  const sessionToken = req.cookies.get("next-auth.session-token")?.value;
  return !!sessionToken;
}
