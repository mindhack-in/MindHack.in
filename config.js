export const blogJson="../dynamic/blogs.json";

export function renderBlog(containerId, jsonData) {
  const container = document.getElementById(containerId);
  container.innerHTML = "";

  jsonData.forEach((item, index) => {

    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "../assets/css/blog.css";
    document.head.appendChild(link);

    let el;
    switch (item.type.toLowerCase()) {
      case "h1":
        el = document.createElement("h1");
        el.textContent = item.content;
        break;
      case "h2":
        el = document.createElement("h2");
        el.textContent = item.content;
        break;
      case "div-tag":
        el = document.createElement("div");
        el.classList.add("tags");
        item.content.forEach((tag) => {
          const span = document.createElement("span");
          span.classList.add("tag");
          span.innerHTML = tag.content;
          el.appendChild(span);
        });
        break;
      case "p-list":
        el = document.createElement("p");
        item.content.forEach((p) => {
          if (p.type === "strong") {
            const span = document.createElement("strong");
            span.innerHTML = p.content;
            el.appendChild(span);
          } else {
            const span = document.createElement("span");
            span.innerHTML = p.content;
            el.appendChild(span);
          }
        });
        break;

      case "list":
        if (item.subType === "ul") el = document.createElement("ul");
        else el = document.createElement("ol");

        item.content.forEach((liItem) => {
          const li = document.createElement("li");
          li.innerHTML = liItem;
          el.appendChild(li);
        });

        break;

      case "faq":
        el = document.createElement("div");
        const h2=document.createElement("h2");
        h2.innerHTML="FAQs"
        el.appendChild(h2);
        item.content.forEach((faq) => {
          const faqItem = document.createElement("div");
          faqItem.classList.add("faq-item");
          faqItem.addEventListener("click", () => {
            faqItem.classList.toggle("active");
          });
          const question = document.createElement("div");
          question.classList.add("faq-question");
          question.innerHTML = faq.question;
          faqItem.appendChild(question);

          const answer = document.createElement("div");
          answer.classList.add("faq-answer");
          answer.innerHTML = faq.answer;
          faqItem.appendChild(answer);

          el.appendChild(faqItem);
        });
        break;
      default:
        el = document.createElement("div");
        el.textContent = "Unknown type: " + item.type;
    }
    el.classList.add("entity");

    container.appendChild(el);
  });
}
