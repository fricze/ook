// First, we need to declare that our class is extending the native HTMLUListElement
class ExpandingList extends HTMLUListElement {
  // TypeScript expects properties to be declared before they are used.
  // In this case, we'll declare properties if we need them.
  // For the given code, no explicit properties are declared outside of methods.

  constructor() {
    console.log("hello");
    super(); // Call the parent class' constructor
    // In TypeScript, 'self' is not typically used. Use 'this' to refer to the instance.
    // 'this' is implicitly typed and does not need manual annotation in this context.
  }

  // Specify the method without changing, TypeScript is fine with the structure.
  // However, inside methods, 'this' should be used instead of 'self' to refer to the instance.
  connectedCallback(): void {
    // Adjusted 'self' to 'this' to correctly refer to the instance
    const uls = Array.from(this.querySelectorAll("ul"));
    const lis = Array.from(this.querySelectorAll("li"));

    uls.forEach((ul) => {
      ul.style.display = "none";
    });

    lis.forEach((li) => {
      if (li.querySelectorAll("ul").length > 0) {
        li.setAttribute("class", "closed");

        const childNodes = li.childNodes;
        const childText = Array.from(childNodes).find(
          (node) => node.nodeType === Node.TEXT_NODE,
        );
        if (!childText) return; // Guard clause if no text node is found

        const newSpan = document.createElement("span");
        newSpan.textContent = childText.textContent;
        newSpan.style.cursor = "pointer";

        newSpan.addEventListener("click", (e) => {
          const nextul = (e.target as HTMLElement)
            .nextElementSibling as HTMLElement;

          if (nextul.style.display === "block") {
            nextul.style.display = "none";
            const parent = nextul.parentNode as HTMLElement;
            parent?.setAttribute("class", "closed");
          } else {
            nextul.style.display = "block";
            const parent = nextul.parentNode as HTMLElement;
            parent?.setAttribute("class", "open");
          }
        });

        childText.parentNode?.insertBefore(newSpan, childText);
        childText.parentNode?.removeChild(childText);
      }
    });
  }
}

// Don't forget to define the custom element with the custom elements API
// The TypeScript type checker doesn't recognize custom element definitions by default,
// so this operation remains the same as in JavaScript.
customElements.define("expanding-list", ExpandingList, { extends: "ul" });
