import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"

export const getAuthSession = () => {
  return getServerSession(authOptions)
}

export const checkServerRole = async (requiredRoleId: string) => {
  const session = await getServerSession(authOptions)
  if (!session) return false
  
  // For development, you can temporarily hardcode a check
  // In production, implement actual Discord role checking
  return true
}

export const ROLE_IDS = {
  STAFF: "1376876672409669672",
  TRAINER: "1376876703808360559",
  DASHBOARD: "1377651835715846214"
}
