const cursor = document.getElementById("cursor");

if (cursor) {
    document.addEventListener("mousemove", (e) => {
        cursor.style.top = `${e.clientY}px`;
        cursor.style.left = `${e.clientX}px`;
    });

    // Fügt den Hover-Effekt hinzu
    document.querySelectorAll(".button").forEach(element => {
        element.addEventListener("mouseenter", () => {
            cursor.classList.add("hovered");
        });

        element.addEventListener("mouseleave", () => {
            cursor.classList.remove("hovered");
        });
    });
} else {
    console.warn("Element '#cursor' not found.");
}
