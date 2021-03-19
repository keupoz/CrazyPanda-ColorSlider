/**
 * Record of RGB colors for CSS properties
 * @type {Record<string, number[]>}
 */
const colors = {
    backgroundColor: [255, 255, 255],
    color: [0, 0, 0]
};

/** Currently selected property */
let currentProperty = "color";

/**
 * Get color for specified property
 * @param {string} property
 */
function getColor(property) {
    const result = colors[property];

    if (result === undefined) throw new Error(`No color for "${property}" property`);

    return result;
}

/**
 * Update color sliders for specified property
 * @param {string} property
 */
function updateSliders(property) {
    const rgb = getColor(property);

    $("#slider-red").slider("option", "value", rgb[0]);
    $("#slider-green").slider("option", "value", rgb[1]);
    $("#slider-blue").slider("option", "value", rgb[2]);
}

/**
 * Update specified CSS property of the element
 * @param {string} property
 */
function updateCSS(property) {
    const rgb = getColor(property);

    $("#preview").css(property, `rgb(${rgb.join(",")})`);
}

// Init buttons
$("#colortype button").button().on("click", function () {
    // Wrap clicked button into JQuery instance
    const $this = $(this);

    // Remove active state from all buttons
    $("#colortype button").removeClass("ui-state-active");
    // Add active state to current button
    $this.addClass("ui-state-active");

    // Update current property
    currentProperty = $this.text();
    // Update sliders for current property
    updateSliders(currentProperty);
});

// Initial state
$("#colortype-color").addClass("ui-state-active");

// Init sliders
$("#sliders > div").slider({
    max: 255,
    range: "min",

    slide(e, ui) {
        // Get current RGB array
        const rgb = getColor(currentProperty);

        // Update changed channel
        switch (e.target.id) {
            case "slider-red": rgb[0] = ui.value || 0; break;
            case "slider-green": rgb[1] = ui.value || 0; break;
            case "slider-blue": rgb[2] = ui.value || 0; break;
            default: return;
        }

        // Update the element
        updateCSS(currentProperty);

        // Sliders don't work if handler doesn't return true
        return true;
    }
});

updateCSS("backgroundColor");
updateCSS("color");
