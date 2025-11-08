(function () {
    if (!window.pageConfig.js || !window.pageConfig.js.path) {
        console.error("pageConfig or path not defined!");
        return;
    }

    const {path, ...features} = window.pageConfig.js;

    function addScript(fileName) {
        const script = document.createElement("script");
        script.src = `${path}${fileName}.js`;
        script.async = true; // non-blocking load
        script.type = "module";
        // script.async = false; // maintain load order

        document.head.appendChild(script);
    }

    Object.entries(features).forEach(([key, value]) => {
        if (key === 'gtag' && value === true) {
            const script = document.createElement("script");
            script.src = `https://www.googletagmanager.com/gtag/js?id=G-9RC3CF2CZ3`;
            script.async = true; // non-blocking load

            window.dataLayer = window.dataLayer || [];

            function gtag() {
                dataLayer.push(arguments);
            }
            gtag('js', new Date());
            gtag('config', 'G-9RC3CF2CZ3');
            document.head.appendChild(script);
        } else if (value === true) {
            addScript(key);
        }


    });


    const schema =   {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "MindHack.in",
        "url": "https://mindhack.in/",
        "logo": "https://mindhack-in.github.io/MindHack.in/dynamic/profile.png"
    };

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.textContent = JSON.stringify(schema, null, 2);
    document.head.appendChild(script);

})();
