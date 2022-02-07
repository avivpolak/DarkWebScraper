export const extractDataFromText = (
    text: string,
    regex: RegExp
): string | undefined => {
    try {
        if (!regex || !text) return text;
        const match = text.match(regex);
        return  (match && match.length > 0 && match[0]) ? match[0].trim():text
    } catch (error: unknown) {
        if (typeof error === "string") {
            throw new Error(error);
        }
    }
};
