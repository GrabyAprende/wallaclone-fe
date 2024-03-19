import { NextRequest, NextResponse} from "next/server";
import { updateSession } from "../lib";

export async function middleware(request: NextRequest) {
    const response = await updateSession(request);

    return response;
}
