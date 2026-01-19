let y;

const recipesGrid = document.getElementById("recipes-grid");
const searchInput = document.getElementById("search-input");
const backToMealsBtn = document.getElementById("back-to-meals-btn")
const mainContent = document.getElementById("main-content")
const mealDetails = document.getElementById("meal-details")
const productsearchInput = document.getElementById("product-search-input")
const productsGrid = document.getElementById("products-grid")
const searchProductBtn = document.getElementById("search-product-btn")
const lookupBarcodeBtn = document.getElementById("lookup-barcode-btn")
const barcodeInput = document.getElementById("barcode-input")
const productDetailModal = document.getElementById("product-detail-modal")
let timer = null;          // للـ debounce
let currentQuery = "chicken";
let z = ""

async function fetchData(q) {
  // لو q فاضي رجعه chicken
  if (!q || !q.trim()) q = "chicken";
  currentQuery = q;

  const res = await fetch(
    `https://nutriplan-api.vercel.app/api/meals/search?q=${encodeURIComponent(q)}&page=1&limit=25`
  );

  y = await res.json();
  return y;
}

function design(i) {
  const item = y.results[i];

  return `
    <div class="recipe-card bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all cursor-pointer group"
      data-meal-id="${item.id}">
      <div class="relative h-48 overflow-hidden">
        <img
          class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          src="${item.thumbnail}"
          alt="${item.name}"
          loading="lazy"
        />
        <div class="absolute bottom-3 left-3 flex gap-2">
          <span class="px-2 py-1 bg-white/90 backdrop-blur-sm text-xs font-semibold rounded-full text-gray-700">
            ${item.category}
          </span>
          <span class="px-2 py-1 bg-emerald-500 text-xs font-semibold rounded-full text-white">
            ${item.area}
          </span>
        </div>
      </div>
      <div class="p-4">
        <h3 class="text-base font-bold text-gray-900 mb-1 group-hover:text-emerald-600 transition-colors line-clamp-1">
          ${item.name}
        </h3>
        <p class="text-xs text-gray-600 mb-3 line-clamp-2">
          ${item.instructions}
        </p>
        <div class="flex items-center justify-between text-xs">
          <span class="font-semibold text-gray-900">
            <i class="fa-solid fa-utensils text-emerald-600 mr-1"></i>
            ${item.category}
          </span>
          <span class="font-semibold text-gray-500">
            <i class="fa-solid fa-globe text-blue-500 mr-1"></i>
            ${item.area}
          </span>
        </div>
      </div>
    </div>
  `;
}

function display() {
  if (!recipesGrid) return;
  if (!y || !y.results) return;

  let cartona = "";
  for (let i = 0; i < y.results.length; i++) {
    cartona += design(i);
  }
  recipesGrid.innerHTML = cartona;
}

function handleSearchInput() {
  const q = searchInput.value.trim();

  clearTimeout(timer);
  timer = setTimeout(async function () {
    await fetchData(q);
    display();
  }, 400);
}

if (searchInput) {
  searchInput.addEventListener("input", handleSearchInput);
}

document.addEventListener("DOMContentLoaded", async function () {
  await fetchData("chicken");
  display();
});







const areaFilterBtn = document.querySelectorAll(".area-filter-btn");

for (let j = 0; j < areaFilterBtn.length; j++) {
  areaFilterBtn[j].addEventListener("click", function () {

    for (let i = 0; i < areaFilterBtn.length; i++) {
      areaFilterBtn[i].classList.remove("bg-emerald-600", "text-white");
      areaFilterBtn[i].classList.add("bg-gray-100", "text-gray-700");
    }

    areaFilterBtn[j].classList.add("bg-emerald-600", "text-white");
    areaFilterBtn[j].classList.remove("bg-gray-100", "text-gray-700");


    if (j == 0) {
      // All Cuisines: رجّع البحث العادي
      clearTimeout(timer);
      timer = setTimeout(async function () {
        await fetchData(searchInput.value);
        display();
      }, 400);
    }

    if (j == 1) {
      // Algerian فقط
      z = "Algerian";
      clearTimeout(timer);
      timer = setTimeout(async function () {
        await fetchData2(z);
        display();
      }, 400);
    }
    if (j == 2) {
      // Algerian فقط
      z = "American";
      clearTimeout(timer);
      timer = setTimeout(async function () {
        await fetchData2(z);
        display();
      }, 400);
    }
    if (j == 3) {
      // Algerian فقط
      z = "Argentinian";
      clearTimeout(timer);
      timer = setTimeout(async function () {
        await fetchData2(z);
        display();
      }, 400);
    }
    if (j == 4) {
      // Algerian فقط
      z = "Australian";
      clearTimeout(timer);
      timer = setTimeout(async function () {
        await fetchData2(z);
        display();
      }, 400);
    }
    if (j == 5) {
      // Algerian فقط
      z = "British";
      clearTimeout(timer);
      timer = setTimeout(async function () {
        await fetchData2(z);
        display();
      }, 400);
    }
    if (j == 6) {
      // Algerian فقط
      z = "Canadian";
      clearTimeout(timer);
      timer = setTimeout(async function () {
        await fetchData2(z);
        display();
      }, 400);
    }
    if (j == 7) {
      // Algerian فقط
      z = "Chinese";
      clearTimeout(timer);
      timer = setTimeout(async function () {
        await fetchData2(z);
        display();
      }, 400);
    }
    if (j == 8) {
      // Algerian فقط
      z = "Croatian";
      clearTimeout(timer);
      timer = setTimeout(async function () {
        await fetchData2(z);
        display();
      }, 400);
    }
    if (j == 9) {
      // Algerian فقط
      z = "Dutch";
      clearTimeout(timer);
      timer = setTimeout(async function () {
        await fetchData2(z);
        display();
      }, 400);
    }
    if (j == 10) {
      // Algerian فقط
      z = "Egyptian";
      clearTimeout(timer);
      timer = setTimeout(async function () {
        await fetchData2(z);
        display();
      }, 400);
    }





  });
}




const zzz = document.querySelectorAll(".zzz")

for (let j = 0; j < zzz.length; j++) {
  zzz[j].addEventListener("click", function () {


    if (j == 0) {
      // All Cuisines: رجّع البحث العادي
      z = "Beef";
      clearTimeout(timer);
      timer = setTimeout(async function () {
        await fetchData3(z);
        display();
      }, 400);
    }

    if (j == 1) {
      // Algerian فقط
      z = "Chicken";
      clearTimeout(timer);
      timer = setTimeout(async function () {
        await fetchData3(z);
        display();
      }, 400);
    }
    if (j == 2) {
      // Algerian فقط
      z = "Dessert";
      clearTimeout(timer);
      timer = setTimeout(async function () {
        await fetchData3(z);
        display();
      }, 400);
    }
    if (j == 3) {
      // Algerian فقط
      z = "Lamb";
      clearTimeout(timer);
      timer = setTimeout(async function () {
        await fetchData3(z);
        display();
      }, 400);
    }
    if (j == 4) {
      // Algerian فقط
      z = "Miscellaneous";
      clearTimeout(timer);
      timer = setTimeout(async function () {
        await fetchData3(z);
        display();
      }, 400);
    }
    if (j == 5) {
      // Algerian فقط
      z = "Pasta";
      clearTimeout(timer);
      timer = setTimeout(async function () {
        await fetchData3(z);
        display();
      }, 400);
    }
    if (j == 6) {
      // Algerian فقط
      z = "Pork";
      clearTimeout(timer);
      timer = setTimeout(async function () {
        await fetchData3(z);
        display();
      }, 400);
    }
    if (j == 7) {
      // Algerian فقط
      z = "Seafood";
      clearTimeout(timer);
      timer = setTimeout(async function () {
        await fetchData3(z);
        display();
      }, 400);
    }
    if (j == 8) {
      // Algerian فقط
      z = "Side";
      clearTimeout(timer);
      timer = setTimeout(async function () {
        await fetchData3(z);
        display();
      }, 400);
    }
    if (j == 9) {
      // Algerian فقط
      z = "Starter";
      clearTimeout(timer);
      timer = setTimeout(async function () {
        await fetchData3(z);
        display();
      }, 400);
    }
    if (j == 10) {
      // Algerian فقط
      z = "Vegan";
      clearTimeout(timer);
      timer = setTimeout(async function () {
        await fetchData3(z);
        display();
      }, 400);
    }
    if (j == 11) {
      // Algerian فقط
      z = "Vegetarian";
      clearTimeout(timer);
      timer = setTimeout(async function () {
        await fetchData3(z);
        display();
      }, 400);
    }





  });
}



async function fetchData2(z) {
  const res = await fetch(
    `https://nutriplan-api.vercel.app/api/meals/filter?area=${encodeURIComponent(z)}&page=1&limit=25`
  );

  y = await res.json();
  console.log(y);
  return y;
}


async function fetchData3(z) {
  const res = await fetch(
    `https://nutriplan-api.vercel.app/api/meals/filter?category=${encodeURIComponent(z)}&page=1&limit=25`
  );

  y = await res.json();
  console.log(y);
  return y;
}

// 1) لما تدوس على كارت أكلة
if (recipesGrid) {
  recipesGrid.addEventListener("click", function (e) {
    var card = e.target.closest(".recipe-card");
    if (!card) return;

    var mealId = card.dataset.mealId;
    showMealDetails(mealId);
  });
}

// 2) دالة بتجيب التفاصيل وتعرضها
async function showMealDetails(mealId) {
  // اخفي الصفحة الرئيسية
  var searchSection = document.getElementById("search-filters-section");
  var categoriesSection = document.getElementById("meal-categories-section");
  var recipesSection = document.getElementById("all-recipes-section");
  var detailsSection = document.getElementById("meal-details");

  if (searchSection) searchSection.classList.add("hidden");
  if (categoriesSection) categoriesSection.classList.add("hidden");
  if (recipesSection) recipesSection.classList.add("hidden");
  if (detailsSection) detailsSection.classList.remove("hidden");

  // هات بيانات الوجبة من API
  var res = await fetch("https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + mealId);
  var data = await res.json();

  var meal = null;
  if (data && data.meals && data.meals.length > 0) {
    meal = data.meals[0];
  }
  if (!meal) return;

  await hydrateNutritionUI(meal);


  // ========== (A) الصورة ==========
  var detailsImg = document.querySelector("#meal-details img");
  if (detailsImg) {
    detailsImg.src = meal.strMealThumb;
    detailsImg.alt = meal.strMeal;
  }

  // ========== (B) الاسم ==========
  var title = document.querySelector("#meal-details h1");
  if (title) title.textContent = meal.strMeal;

  // ========== (C) نوع الأكلة + البلد ==========
  var badgesRow = document.querySelector("#meal-details .absolute .flex.items-center.gap-3");
  if (badgesRow) {
    badgesRow.innerHTML =
      '<span class="px-3 py-1 bg-emerald-500 text-white text-sm font-semibold rounded-full">' +
      (meal.strCategory || "") +
      '</span>' +
      '<span class="px-3 py-1 bg-blue-500 text-white text-sm font-semibold rounded-full">' +
      (meal.strArea || "") +
      "</span>";
  }

  // ========== (D) المكونات ==========
  var ingGrid = document.querySelector("#meal-details .bg-white.rounded-2xl.shadow-lg.p-6 .grid");
  if (ingGrid) {
    var html = "";

    for (var i = 1; i <= 20; i++) {
      var ing = meal["strIngredient" + i];
      var meas = meal["strMeasure" + i];

      if (ing && ing.trim()) {
        html +=
          '<div class="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">' +
          // checkbox
          '<input type="checkbox" class="w-4 h-4 text-blue-600 border-gray-300 rounded">' +
          '<span class="text-gray-700">' +
          '<span class="font-medium text-gray-900">' +
          ((meas || "").trim()) +
          "</span> " +
          ing.trim() +
          "</span>" +
          "</div>";
      }

    }

    ingGrid.innerHTML = html;
  }

  // ========== (E) طريقة العمل ==========
  var stepsWrap = document.querySelector("#meal-details .space-y-4");
  if (stepsWrap) {
    var instructions = meal.strInstructions || "";
    var parts = instructions.split(/\r?\n+/);

    var stepsHtml = "";
    var stepNumber = 0;

    for (var s = 0; s < parts.length; s++) {
      var step = parts[s].trim();
      if (!step) continue;

      stepNumber++;

      stepsHtml +=
        '<div class="flex gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors">' +
        '<div class="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold shrink-0">' +
        stepNumber +
        "</div>" +
        '<p class="text-gray-700 leading-relaxed pt-2">' +
        step +
        "</p>" +
        "</div>";
    }

    stepsWrap.innerHTML = stepsHtml;
  }

  // ========== (F) فيديو يوتيوب (لو موجود) ==========
  var iframe = document.querySelector("#meal-details iframe");
  if (iframe) {
    if (meal.strYoutube) {
      var idPart = meal.strYoutube.split("v=")[1];
      var id = idPart ? idPart.split("&")[0] : "";
      iframe.src = id ? "https://www.youtube.com/embed/" + id : "";
    } else {
      iframe.src = "";
    }
  }
}

if (backToMealsBtn) {
  backToMealsBtn.addEventListener("click", function () {
    var detailsSection = document.getElementById("meal-details");
    var searchSection = document.getElementById("search-filters-section");
    var categoriesSection = document.getElementById("meal-categories-section");
    var recipesSection = document.getElementById("all-recipes-section");

    if (detailsSection) detailsSection.classList.add("hidden");
    if (searchSection) searchSection.classList.remove("hidden");
    if (categoriesSection) categoriesSection.classList.remove("hidden");
    if (recipesSection) recipesSection.classList.remove("hidden");
  });
}

const productsSection = document.getElementById("products-section")
const foodlogSection = document.getElementById("foodlog-section")



const qqq = document.querySelectorAll(".qqq")


qqq[0].addEventListener("click", function () {
  qqq[0].classList.add("bg-emerald-50", "text-emerald-700")
  qqq[0].classList.remove("text-gray-600", "hover:bg-gray-50")

  qqq[1].classList.remove("bg-emerald-50", "text-emerald-700")
  qqq[1].classList.add("text-gray-600", "hover:bg-gray-50")

  qqq[2].classList.remove("bg-emerald-50", "text-emerald-700")
  qqq[2].classList.add("text-gray-600", "hover:bg-gray-50")
  mealDetails.classList.remove("hidden")
  productsSection.classList.add("hidden")
  foodlogSection.classList.add("hidden")



}
)



qqq[1].addEventListener("click", function () {
  qqq[1].classList.add("bg-emerald-50", "text-emerald-700")
  qqq[1].classList.remove("text-gray-600", "hover:bg-gray-50")

  qqq[0].classList.remove("bg-emerald-50", "text-emerald-700")
  qqq[0].classList.add("text-gray-600", "hover:bg-gray-50")

  qqq[2].classList.remove("bg-emerald-50", "text-emerald-700")
  qqq[2].classList.add("text-gray-600", "hover:bg-gray-50")

  mainContent.classList.add("hidden")
  productsSection.classList.remove("hidden")
  foodlogSection.classList.add("hidden")
}
)

qqq[2].addEventListener("click", function () {
  qqq[2].classList.add("bg-emerald-50", "text-emerald-700")
  qqq[2].classList.remove("text-gray-600", "hover:bg-gray-50")

  qqq[1].classList.remove("bg-emerald-50", "text-emerald-700")
  qqq[1].classList.add("text-gray-600", "hover:bg-gray-50")

  qqq[0].classList.remove("bg-emerald-50", "text-emerald-700")
  qqq[0].classList.add("text-gray-600", "hover:bg-gray-50")

  mainContent.classList.add("hidden")
  productsSection.classList.add("hidden")
  foodlogSection.classList.remove("hidden")
}
)


async function fetchDataa(q) {


  const res = await fetch(
    `https://nutriplan-api.vercel.app/api/products/search?q=${encodeURIComponent(q)}&page=1&limit=24`
  );

  z = await res.json();
  console.log(z);
  return z;
}



function design2(i) {
  const item = z.results[i];


  return `<div
          class="product-card bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all cursor-pointer group"
          data-barcode="${item.barcode}">
          <div class="relative h-40 bg-gray-100 flex items-center justify-center overflow-hidden">
            <img class="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
              src="${item.image}"
              alt="${item.name}" loading="lazy" />

            <!-- Nutri-Score Badge -->
            <div class="absolute top-2 left-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded uppercase">
              Nutri-Score ${item.nutritionGrade}
            </div>

            <!-- NOVA Badge -->
            <div
              class="absolute top-2 right-2 bg-lime-500 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center"
              title="NOVA ${item.nova}">
              ${item.nova}
            </div>
          </div>

          <div class="p-4">
            <p class="text-xs text-emerald-600 font-semibold mb-1 truncate">
              ${item.brand}
            </p>
            <h3 class="font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-emerald-600 transition-colors">
              ${item.name}
            </h3>

            <div class="flex items-center gap-3 text-xs text-gray-500 mb-3">
              <span><i class="fa-solid fa-weight-scale mr-1"></i>${item.quantity}</span>
              <span><i class="fa-solid fa-fire mr-1"></i>${item.calories} kcal/100g</span>
            </div>

            <!-- Mini Nutrition -->
            <div class="grid grid-cols-4 gap-1 text-center">
              <div class="bg-emerald-50 rounded p-1.5">
                <p class="text-xs font-bold text-emerald-700">${item.protein}g</p>
                <p class="text-[10px] text-gray-500">Protein</p>
              </div>
              <div class="bg-blue-50 rounded p-1.5">
                <p class="text-xs font-bold text-blue-700">${item.carbs}g</p>
                <p class="text-[10px] text-gray-500">Carbs</p>
              </div>
              <div class="bg-purple-50 rounded p-1.5">
                <p class="text-xs font-bold text-purple-700">${item.fat}g</p>
                <p class="text-[10px] text-gray-500">Fat</p>
              </div>
              <div class="bg-orange-50 rounded p-1.5">
                <p class="text-xs font-bold text-orange-700">${item.sugar}g</p>
                <p class="text-[10px] text-gray-500">Sugar</p>
              </div>
            </div>
          </div>
        </div>`;
}

function display2() {
  if (!productsGrid) return;
  if (!z || !z.results) return;

  let cartona = "";
  for (let i = 0; i < z.results.length; i++) {
    cartona += design2(i);
  }
  productsGrid.innerHTML = cartona;
}


function productsearch() {
  const q = productsearchInput.value.trim();

  clearTimeout(timer);
  timer = setTimeout(async function () {
    await fetchDataa(q);
    display2();
  }, 400);

}

searchProductBtn.addEventListener("click", productsearch)

async function fetchDataaa(q) {
  const res = await fetch(
    `https://nutriplan-api.vercel.app/api/products/barcode/${encodeURIComponent(q)}`
  );

  const data = await res.json();
  const item = normalizeBarcodeResponse(data);

  z = { results: [item] };
  return z;
}


async function barcodesearch() {
  const q = barcodeInput.value.trim();
  if (!q) return;

  await fetchDataaa(q);
  display2();
}

lookupBarcodeBtn.addEventListener("click", barcodesearch);


async function fetchProductDetails(barcode) {
  const res = await fetch(
    `https://nutriplan-api.vercel.app/api/products/barcode/${encodeURIComponent(barcode)}`
  );
  return await res.json();
}

function productModalDiv(item) {
  return `
  <div class="bg-white rounded-2xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
    <div class="p-6">
      <!-- Header -->
      <div class="flex items-start gap-6 mb-6">
        <div class="w-32 h-32 bg-gray-100 rounded-xl flex items-center justify-center overflow-hidden flex-shrink-0">
          <img src="${item.image}" alt="${item.name}" class="w-full h-full object-contain">
        </div>

        <div class="flex-1">
          <p class="text-sm text-emerald-600 font-semibold mb-1">${item.brand}</p>
          <h2 class="text-2xl font-bold text-gray-900 mb-2">${item.name}</h2>
          <p class="text-sm text-gray-500 mb-3">${item.quantity}</p>

          <div class="flex items-center gap-3">
            <div class="flex items-center gap-2 px-3 py-1.5 rounded-lg" style="background-color: #85bb2f20">
              <span class="w-8 h-8 rounded flex items-center justify-center text-white font-bold" style="background-color: #85bb2f">
                ${item.nutritionGrade}
              </span>
              <div>
                <p class="text-xs font-bold" style="color: #85bb2f">Nutri-Score</p>
                <p class="text-[10px] text-gray-600">Good</p>
              </div>
            </div>
          </div>
        </div>

        <button class="close-product-modal text-gray-400 hover:text-gray-600">
          <i class="text-2xl fa-solid fa-xmark"></i>
        </button>
      </div>

      <!-- Nutrition Facts -->
      <div class="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-5 mb-6 border border-emerald-200">
        <h3 class="font-bold text-gray-900 mb-4 flex items-center gap-2">
          <i class="fa-solid fa-chart-pie text-emerald-600"></i>
          Nutrition Facts <span class="text-sm font-normal text-gray-500">(per 100g)</span>
        </h3>

        <div class="text-center mb-4 pb-4 border-b border-emerald-200">
          <p class="text-4xl font-bold text-gray-900">${item.calories}</p>
          <p class="text-sm text-gray-500">Calories</p>
        </div>

        <div class="grid grid-cols-4 gap-4">
          <div class="text-center">
            <div class="w-full bg-gray-200 rounded-full h-2 mb-2">
              <div class="bg-emerald-500 h-2 rounded-full" style="width: 0%"></div>
            </div>
            <p class="text-lg font-bold text-emerald-600">${item.protein}g</p>
            <p class="text-xs text-gray-500">Protein</p>
          </div>

          <div class="text-center">
            <div class="w-full bg-gray-200 rounded-full h-2 mb-2">
              <div class="bg-blue-500 h-2 rounded-full" style="width: 0%"></div>
            </div>
            <p class="text-lg font-bold text-blue-600">${item.carbs}g</p>
            <p class="text-xs text-gray-500">Carbs</p>
          </div>

          <div class="text-center">
            <div class="w-full bg-gray-200 rounded-full h-2 mb-2">
              <div class="bg-purple-500 h-2 rounded-full" style="width: 0%"></div>
            </div>
            <p class="text-lg font-bold text-purple-600">${item.fat}g</p>
            <p class="text-xs text-gray-500">Fat</p>
          </div>

          <div class="text-center">
            <div class="w-full bg-gray-200 rounded-full h-2 mb-2">
              <div class="bg-orange-500 h-2 rounded-full" style="width: 0%"></div>
            </div>
            <p class="text-lg font-bold text-orange-600">${item.sugar}g</p>
            <p class="text-xs text-gray-500">Sugar</p>
          </div>
        </div>

        <div class="grid grid-cols-3 gap-4 mt-4 pt-4 border-t border-emerald-200">
          <div class="text-center">
            <p class="text-sm font-semibold text-gray-900">${item.satFat}g</p>
            <p class="text-xs text-gray-500">Saturated Fat</p>
          </div>
          <div class="text-center">
            <p class="text-sm font-semibold text-gray-900">${item.fiber}g</p>
            <p class="text-xs text-gray-500">Fiber</p>
          </div>
          <div class="text-center">
            <p class="text-sm font-semibold text-gray-900">${item.salt}g</p>
            <p class="text-xs text-gray-500">Salt</p>
          </div>
        </div>
      </div>

      <!-- Actions -->
      <div class="flex gap-3">
        <button class="add-product-to-log flex-1 py-3 bg-emerald-600 text-white rounded-xl font-semibold hover:bg-emerald-700 transition-all"
          data-barcode="${item.barcode}">
          <i class="fa-solid fa-plus mr-2"></i>Log This Food
        </button>
        <button class="close-product-modal flex-1 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-all">
          Close
        </button>
      </div>
    </div>
  </div>`;
}


if (productsGrid) {
  productsGrid.addEventListener("click", async function (e) {
    var card = e.target.closest(".product-card");
    if (!card) return;

    var barcode = card.dataset.barcode;

    var raw = await fetchProductDetails(barcode);

    // ✅ دي أهم سطر
    var item = normalizeBarcodeResponse(raw);

    productDetailModal.classList.remove("hidden");
    productDetailModal.innerHTML = productModalDiv(item);

  });
}

if (productDetailModal) {
  productDetailModal.addEventListener("click", function (e) {
    // لو ضغط على زرار الإغلاق (X أو Close)
    var btn = e.target.closest(".close-product-modal");
    if (btn) {
      productDetailModal.classList.add("hidden");
      productDetailModal.innerHTML = "";
      return;
    }

    // (اختياري) لو ضغط على الخلفية اللي برا الكارد يقفل
    if (e.target === productDetailModal) {
      productDetailModal.classList.add("hidden");
      productDetailModal.innerHTML = "";
      return;
    }
  });
}



function normalizeBarcodeResponse(data) {
  var p = data.product || data.result || data;   // لو متغلف جوا product

  var n = p.nutriments || p.nutrients || p.nutrition || {};

  return {
    barcode: p.barcode || p.code || data.code,
    name: p.name || p.product_name || p.product_name_en,
    brand: p.brand || p.brands,
    image: p.image || p.image_front_url || p.image_url,
    quantity: p.quantity || p.serving_size,

    nutritionGrade: p.nutritionGrade || p.nutrition_grades,
    nova: p.nova || p.nova_group,

    // أرقام التغذية (لو مش موجودة هتبقى undefined برضه حسب الداتا)
    calories: p.calories || n["energy-kcal_100g"] || n.energy_kcal_100g,
    protein: p.protein || n.proteins_100g || n.protein_100g,
    carbs: p.carbs || n.carbohydrates_100g,
    fat: p.fat || n.fat_100g,
    sugar: p.sugar || n.sugars_100g,

    satFat: p.satFat || n["saturated-fat_100g"] || n.saturated_fat_100g,
    fiber: p.fiber || n.fiber_100g,
    salt: p.salt || n.salt_100g
  };
}


