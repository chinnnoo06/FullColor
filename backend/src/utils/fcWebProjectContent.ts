import sanitizeHtml from "sanitize-html";

/**
 * Solo texto enriquecido — sin imágenes ni archivos embebidos.
 * El estilo lo aplica el frontend.
 */
const ALLOWED_TAGS = [
    "p", "h2", "h3", "h4", "br", "hr",
    "ul", "ol", "li",
    "blockquote",
    "strong", "b", "em", "i", "u", "s",
    "a",
    "table", "thead", "tbody", "tr", "th", "td"
];

const ALLOWED_ATTRIBUTES: sanitizeHtml.IOptions["allowedAttributes"] = {
    a: ["href", "target", "rel"],
    th: ["colspan", "rowspan"],
    td: ["colspan", "rowspan"]
};

export const sanitizeFCWebProjectContent = (html: string) =>
    sanitizeHtml(html, {
        allowedTags: ALLOWED_TAGS,
        allowedAttributes: ALLOWED_ATTRIBUTES,
        allowedSchemes: ["http", "https", "mailto", "tel"],
        allowedSchemesAppliedToAttributes: ["href"],
        transformTags: {
            a: (tagName, attribs) => ({
                tagName,
                attribs: attribs.target === "_blank"
                    ? { ...attribs, rel: "noopener noreferrer" }
                    : attribs
            })
        }
    });

export const fcWebProjectContentToText = (html: string) =>
    sanitizeHtml(html, { allowedTags: [], allowedAttributes: {} }).replace(/\s+/g, " ").trim();
