import { STRAPI_HOST, STRAPI_TOKEN } from "./config";
export async function getStrapiData(url: string) {

  try {
    const response = await fetch(`${STRAPI_HOST}/api/${url}`, {
      headers: {
        Authorization: `Bearer ${STRAPI_TOKEN}`
      }
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error fetching data:', error);
    return null

  }
}
