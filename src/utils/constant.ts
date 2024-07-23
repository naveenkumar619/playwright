import { getBaseUrl } from "../../config";

const baseUrl = getBaseUrl();

export default {
    loginUrl: `${baseUrl}/#/auth/login`,
    homeUrl: `${baseUrl}/#/scada/overview/index`,
};

export const Banner_variables = {
    Plant_text:'Test Plant',
}