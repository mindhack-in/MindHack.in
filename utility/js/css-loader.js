(function() {
    // Ensure the config exists
    if (!window.pageConfig.css || !window.pageConfig.css.path) {
        console.error("pageConfig or path not defined!");
        return;
    }

    const { path, ...features } = window.pageConfig.css;

    // Helper function to add a CSS file
    function addCSS(fileName) {
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = `${path}${fileName}.css`;
        document.head.appendChild(link);
    }

    // Loop through all keys in the config except 'path'
    Object.entries(features).forEach(([key, value]) => {
        if (value === true) {
            addCSS(key);
        }
    });

    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = `https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css`;
    document.head.appendChild(link);

    // <link rel="stylesheet" href="">

    })();
