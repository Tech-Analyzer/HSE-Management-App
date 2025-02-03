export function validateEnv() {
  const requiredEnvs = ["GOOGLE_PRIVATE_KEY", "GOOGLE_CLIENT_EMAIL", "GOOGLE_SHEET_ID"]

  const missingEnvs = requiredEnvs.filter((env) => !process.env[env])

  if (missingEnvs.length > 0) {
    throw new Error(`Missing required environment variables: ${missingEnvs.join(", ")}`)
  }

  // Validate Google Sheets credentials format
  try {
    const privateKey = process.env.GOOGLE_PRIVATE_KEY!.replace(/\\n/g, "\n")
    if (!privateKey.includes("BEGIN PRIVATE KEY")) {
      throw new Error("Invalid GOOGLE_PRIVATE_KEY format")
    }

    const email = process.env.GOOGLE_CLIENT_EMAIL
    if (!email?.includes("@") || !email?.includes(".iam.gserviceaccount.com")) {
      throw new Error("Invalid GOOGLE_CLIENT_EMAIL format")
    }
  } catch (error) {
    throw new Error(`Invalid credentials format: ${error}`)
  }
}

