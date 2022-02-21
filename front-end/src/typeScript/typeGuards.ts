import { Alert, Alerts } from "../features/alerts/alertsSlice";
import { Keywords } from "../features/keywords/keywordsSlice";

export const isKeywords = (keywords: unknown): keywords is Keywords => {
    if (!Array.isArray(keywords)) {
        return false;
    }

    if (keywords.some((v) => typeof v !== "string")) {
        return false;
    }

    return true;
};

export const isAlert = (alert: unknown): alert is Alert => {
    if (typeof alert === "object") {
        return true;
    }
    return false;
};

export const isAlerts = (alerts: unknown): alerts is Alerts => {
    if (!Array.isArray(alerts)) {
        return false;
    }

    if (alerts.some((v) => !isAlert(v))) {
        return false;
    }

    return true;
};
