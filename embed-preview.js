document.addEventListener("DOMContentLoaded", function () {
    var title = document.querySelector("head title")?.textContent
        || document.querySelector("h1")?.textContent
        || document.title;
    var descriptionMeta = document.querySelector("meta[name='description']");
    var description = descriptionMeta?.content
        || document.querySelector(".blog-post-content p")?.textContent
        || document.querySelector(".intro")?.textContent
        || document.querySelector(".lead")?.textContent
        || "";
    description = description.trim();
    var imageEl = document.querySelector(".featured-image-container img");
    var image = imageEl?.getAttribute("src") || "";
    if (image && !/^https?:\/\//i.test(image)) {
        image = new URL(image, window.location.href).href;
    }
    var url = window.location.href;
    function ensureMeta(name, content, isProperty) {
        if (!content) {
            return;
        }
        var selector = isProperty ? "meta[property='" + name + "']" : "meta[name='" + name + "']";
        var meta = document.head.querySelector(selector);
        if (!meta) {
            meta = document.createElement("meta");
            if (isProperty) {
                meta.setAttribute("property", name);
            } else {
                meta.setAttribute("name", name);
            }
            document.head.appendChild(meta);
        }
        meta.setAttribute("content", content);
    }
    ensureMeta("og:title", title, true);
    ensureMeta("og:description", description, true);
    ensureMeta("og:type", "website", true);
    ensureMeta("og:url", url, true);
    ensureMeta("og:image", image, true);
    ensureMeta("twitter:card", "summary_large_image", false);
    ensureMeta("twitter:title", title, false);
    ensureMeta("twitter:description", description, false);
    ensureMeta("twitter:image", image, false);
    if (!descriptionMeta && description) {
        var desc = document.createElement("meta");
        desc.setAttribute("name", "description");
        desc.setAttribute("content", description);
        document.head.appendChild(desc);
    }
});
