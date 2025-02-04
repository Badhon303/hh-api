import axios from "axios"
// Function to verify the social token based on provider
export default async function verifySocialToken(provider, token) {
  let socialUrl
  switch (provider) {
    case "google":
      socialUrl = "https://www.googleapis.com/oauth2/v3/userinfo"
      break
    case "github":
      socialUrl = "https://api.github.com/user"
      break
    case "linkedin":
      socialUrl = "https://api.linkedin.com/v2/userinfo"
      break
    default:
      return null
  }

  try {
    const socialResponse = await axios.get(socialUrl, {
      headers: { Authorization: `Bearer ${token}` },
    })

    // Extracting user id based on provider
    if (provider === "linkedin") {
      return socialResponse.data.sub
    } else if (provider === "google") {
      return socialResponse.data.sub
    } else {
      return socialResponse.data.id
    }
  } catch (err) {
    console.error(`Failed to authenticate with ${provider}:`, err.message)
    return null
  }
}
