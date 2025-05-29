const data = {
  "Kit Issue": [
    "Bergan/Rucksack",
    "Assault Vest/Webbing",
    "Roll Mat",
    "Basha",
    "Waterproofs",
    "Mess Tins",
  ],
  "Before Packing": [
    "Sleeping bags are not issued and must be supplied by yourself. Ensure they are warm enough for the nighttime temperatures – a 4-season bag is recommended all year round.",
    "Ensure your personally owned items are labelled with your surname and initials using a permanent marker pen.",
    "Temporarily issued items such as waterproofs are to be temporarily labelled with a tag/sniper tape with your surname & initials.",
  ],
  Wearing: [
    "Jungle/Bush Hat (if not owned, beret with cap badge removed)",
    "MTP Shirt",
    "MTP Trousers",
    "Issued T-shirt",
    "Boots",
  ],
  Smock: [
    "Notebook & Pen/Pencil",
    "Torch (red filter)",
    "Gloves",
    "Blanking plates x2",
    "Rank Slide",
  ],
  "Assault Vest/Webbing": [
    "Keep magazine pouches empty – ready for magazines, when issued",
    "KFS",
    "Mug/Flask",
    "Water bottle",
    "30m green string",
    "Rifle cleaning kit",
    "Boo-boo kit",
    "Mess tins",
    "Pan scourer sponge",
    "Cam cream",
    "Spare torch/headtorch",
    "Spare batteries",
    "Moralibo’s",
  ],
  "Bergan/Rucksack": [
    "Roll mat",
    "Sleeping Bag",
    "Bivi bag",
    "MTP Shirt x1",
    "MTP Trousers x1",
    "Socks x2",
    "T-Shirt x1",
    "Issued Fleece",
    "Warm Hat",
    "Spare Underwear x2",
    "Boot Cleaning Kit & Laces",
    "Wash Kit & Wet Wipes",
    "Sewing Kit",
    "DEET",
    "Sun Cream",
  ],
  "Side Pouches": [
    "Waterproof jacket",
    "Shelter system",
    "Basha",
    "Bungees/Jungle knots x5+",
    "Tent pegs x4",
  ],
  "Other Items": ["Prescribed Medication", "Glasses", "Inhalers"],
  "Issued On Exercise": [
    "Rifle cleaning kit",
    "Magazines",
    "Rations",
    "Cooker/Stove",
  ],
  "Final Checklist": [
    "Sleeping bag suitable",
    "All clothing labelled",
    "All equipment labelled",
    "Assault vest/webbing labelled",
    "All packed and waterproofed",
    "No rattling",
    "Pouches secured",
    "Medication accessible",
  ],
};

const checklistContainer = document.getElementById("checklistContainer");

function renderChecklist() {
  checklistContainer.innerHTML = "";
  let index = 0;
  for (let section in data) {
    const sectionDiv = document.createElement("div");
    sectionDiv.className = "section";

    const header = document.createElement("h2");
    header.innerHTML = `${section} <span class="toggle-btn" onclick="toggleSection(this)">[collapse]</span>`;

    const checkAllBtn = document.createElement("button");
    checkAllBtn.className = "check-all";
    checkAllBtn.textContent = "Check All";
    checkAllBtn.onclick = () => {
      const inputs = sectionDiv.querySelectorAll("input[type='checkbox']");
      inputs.forEach((input) => {
        input.checked = true;
        localStorage.setItem(input.id, true);
      });
      updateProgress();
    };

    const uncheckAllBtn = document.createElement("button");
    uncheckAllBtn.className = "uncheck-all";
    uncheckAllBtn.textContent = "Uncheck All";
    uncheckAllBtn.onclick = () => {
      const inputs = sectionDiv.querySelectorAll("input[type='checkbox']");
      inputs.forEach((input) => {
        input.checked = false;
        localStorage.setItem(input.id, false);
      });
      updateProgress();
    };

    const ul = document.createElement("ul");
    data[section].forEach((item) => {
      const li = document.createElement("li");
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.id = `item-${index}`;
      checkbox.checked = localStorage.getItem(checkbox.id) === "true";
      checkbox.onchange = () => {
        localStorage.setItem(checkbox.id, checkbox.checked);
        updateProgress();
      };
      li.appendChild(checkbox);
      li.appendChild(document.createTextNode(" " + item));
      ul.appendChild(li);
      index++;
    });

    sectionDiv.appendChild(header);
    sectionDiv.appendChild(checkAllBtn);
    sectionDiv.appendChild(uncheckAllBtn);
    sectionDiv.appendChild(ul);
    checklistContainer.appendChild(sectionDiv);
  }
  updateProgress();
}

function toggleSection(span) {
  const ul =
    span.parentElement.nextElementSibling.nextElementSibling.nextElementSibling;
  const collapsed = ul.style.display === "none";
  ul.style.display = collapsed ? "block" : "none";
  span.textContent = collapsed ? "[collapse]" : "[expand]";
}

function clearAll() {
  const inputs = document.querySelectorAll("input[type='checkbox']");
  inputs.forEach((input) => {
    input.checked = false;
    localStorage.setItem(input.id, false);
  });
  updateProgress();
}

function updateProgress() {
  const all = document.querySelectorAll("input[type='checkbox']");
  const checked = Array.from(all).filter((cb) => cb.checked).length;
  const percent = Math.round((checked / all.length) * 100);
  document.getElementById(
    "progressTracker"
  ).textContent = `${percent}% complete`;
}

renderChecklist();
