// Ruta de API protegida
import { NextResponse } from "next/server";
import prisma from "@/libs/db";
import { accessControl } from "@/utils/accessControl";

export async function GET(request) {
  const access = await accessControl(request, ["Administrador"]);
  if (access !== true) return access;

  try {
    const roles = await prisma.tbroles.findMany();
    return NextResponse.json(roles);
  } catch {
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
