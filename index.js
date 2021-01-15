'use strict';

var Shuffle = window.Shuffle;

var Demo = function (element) {
  this.industry = Array.from(document.querySelectorAll('.js-industry input'));
  this.tag = Array.from(document.querySelectorAll('.js-tag input'));
  this.format = Array.from(document.querySelectorAll('.js-format input'));

  this.shuffle = new Shuffle(element, {
    easing: 'cubic-bezier(0.165, 0.840, 0.440, 1.000)', // easeOutQuart
    sizer: '.the-sizer',
  });

  this.filters = {
    industry: [],
    tag: [],
    format: [],
  };

  this._bindEventListeners();
};

/**
 * Bind event listeners for when the filters change.
 */
Demo.prototype._bindEventListeners = function () {
  this._onIndustryChange = this._handleIndustryChange.bind(this);
  this._onTagChange = this._handleTagChange.bind(this);
  this._onFormatChange = this._handleFormatChange.bind(this);

  this.industry.forEach(function (input) {
    input.addEventListener('change', this._onIndustryChange);
  }, this);

  this.tag.forEach(function (input) {
    input.addEventListener('change', this._onTagChange);
  }, this);

  this.format.forEach(function (input) {
    input.addEventListener('change', this._onFormatChange);
  }, this);
};

/**
 * Get the values of each checked input.
 * @return {Array.<string>}
 */
Demo.prototype._getCurrentIndustryFilters = function () {
  return this.industry
    .filter(function (input) {
      return input.checked;
    })
    .map(function (input) {
      updateCurrentIndustryFilter(input);
      return input.value;
    });
};

Demo.prototype._getCurrentFormatFilters = function () {
  return this.format
    .filter(function (input) {
      return input.checked;
    })
    .map(function (input) {
      updateCurrentFormatFilter(input);
      return input.value;
    });
};

/**
 * Get the values of each `active` button.
 * @return {Array.<string>}
 */
Demo.prototype._getCurrentTagFilters = function () {
  return this.tag
    .filter(function (input) {
      return input.checked;
    })
    .map(function (input) {
      updateCurrentTagFilter(input);
      return input.value;
    });
};

/* Show Current Tag Filter on Dom */

const item = Array.from(document.querySelectorAll('.aspect'));
const countActive = document.querySelector('.count');

const currentTagFilter = document.querySelector('.tag-filter-section');
const currentIndustryFilter = document.querySelector(
  '.industry-filter-section'
);
const currentFormatFilter = document.querySelector('.format-filter-section');
let currentActiveTagFilter = [];
let uniqueTag = [];

let currentActiveIndustryFilter = [];
let uniqueIndustry = [];

let currentActiveFormatFilter = [];
let uniqueFormat = [];

/* Update Tag Filter Text */

const updateCurrentTagFilter = (input) => {
  currentActiveTagFilter.push(input.value);
  uniqueTag = [...new Set(currentActiveTagFilter)];

  // if (currentActiveFilter.length === 0) {
  //   currentFilter.innerHTML = `<div class="shadow-md p-4"><span>Current Filter: No active filter.</span></div>`;
  // } else {
  currentTagFilter.innerHTML = `<div class="shadow-md p-4"><span>Current Category: ${uniqueTag}</span></div>`;
  // }
};

/* Update Industry Filter Text */

const updateCurrentIndustryFilter = (input) => {
  currentActiveIndustryFilter.push(input.value);
  uniqueIndustry = [...new Set(currentActiveIndustryFilter)];

  // if (currentActiveFilter.length === 0) {
  //   currentFilter.innerHTML = `<div class="shadow-md p-4"><span>Current Filter: No active filter.</span></div>`;
  // } else {
  currentIndustryFilter.innerHTML = `<div class="shadow-md p-4"><span>Current Industry: ${uniqueIndustry}</span></div>`;
  // }
};

/* Update Format Filter Text */

const updateCurrentFormatFilter = (input) => {
  currentActiveFormatFilter.push(input.value);
  uniqueFormat = [...new Set(currentActiveFormatFilter)];

  // if (currentActiveFilter.length === 0) {
  //   currentFilter.innerHTML = `<div class="shadow-md p-4"><span>Current Filter: No active filter.</span></div>`;
  // } else {
  currentFormatFilter.innerHTML = `<div class="shadow-md p-4"><span>Current Industry: ${uniqueFormat}</span></div>`;
  // }
};

/* Show Current Portfolio Count */

const updateText = () => {
  const items = item.filter((item) => {
    if (item.offsetParent.classList.contains('shuffle-item--visible')) {
      return item;
    } else {
      return;
    }
  });
  countActive.textContent = `${items.length} Portfolio found`;
};

/**
 * A shape input check state changed, update the current filters and filte.r
 */
Demo.prototype._handleIndustryChange = function () {
  this.filters.industry = this._getCurrentIndustryFilters();
  this.filter();
  updateText();

  /* Check current checked lenght */
  if (currentActiveIndustryFilter.length === 0) {
    currentIndustryFilter.innerHTML = `<div class="shadow-md p-4"><span>Current Industry: No active filter.</span></div>`;

    setTimeout(() => {
      currentIndustryFilter.firstElementChild.style.display = 'none';
    }, 3000);
  } else {
    currentActiveIndustryFilter = [];
    clearTimeout(
      setTimeout(() => {
        currentIndustryFilter.firstElementChild.style.display = 'none';
      }, 3000)
    );
  }
};

Demo.prototype._handleFormatChange = function () {
  this.filters.format = this._getCurrentFormatFilters();
  this.filter();
  updateText();

  /* Check current checked lenght */
  if (currentActiveFormatFilter.length === 0) {
    currentFormatFilter.innerHTML = `<div class="shadow-md p-4"><span>Current Format: No active filter.</span></div>`;

    setTimeout(() => {
      currentFormatFilter.firstElementChild.style.display = 'none';
    }, 3000);
  } else {
    currentActiveFormatFilter = [];
    clearTimeout(
      setTimeout(() => {
        currentFormatFilter.firstElementChild.style.display = 'none';
      }, 3000)
    );
  }
};

Demo.prototype._handleTagChange = function () {
  this.filters.tag = this._getCurrentTagFilters();
  this.filter();
  updateText();

  /* Check current checked lenght */
  if (currentActiveTagFilter.length === 0) {
    currentTagFilter.innerHTML = `<div class="shadow-md p-4"><span>Current Tag: No active filter.</span></div>`;

    setTimeout(() => {
      currentTagFilter.firstElementChild.style.display = 'none';
    }, 3000);
  } else {
    currentActiveTagFilter = [];
    clearTimeout(
      setTimeout(() => {
        currentTagFilter.firstElementChild.style.display = 'none';
      }, 3000)
    );
  }
};

/**
 * A color button was clicked. Update filters and display.
 * @param {Event} evt Click event object.
 */
// Demo.prototype._handleCategoryChange = function (evt) {
//   var button = evt.currentTarget;

//   // Treat these buttons like radio buttons where only 1 can be selected.
//   if (button.classList.contains('active')) {
//     button.classList.remove('active');
//   } else {
//     this.category.forEach(function (btn) {
//       btn.classList.remove('active');
//     });

//     button.classList.add('active');
//   }

//   this.filters.category = this._getCurrentCategoryFilters();
//   this.filter();
// };

/**
 * Filter shuffle based on the current state of filters.
 */
Demo.prototype.filter = function () {
  if (this.hasActiveFilters()) {
    this.shuffle.filter(this.itemPassesFilters.bind(this));
  } else {
    this.shuffle.filter(Shuffle.ALL_ITEMS);
  }
};

/**
 * If any of the arrays in the `filters` property have a length of more than zero,
 * that means there is an active filter.
 * @return {boolean}
 */
Demo.prototype.hasActiveFilters = function () {
  return Object.keys(this.filters).some(function (key) {
    return this.filters[key].length > 0;
  }, this);
};

/**
 * Determine whether an element passes the current filters.
 * @param {Element} element Element to test.
 * @return {boolean} Whether it satisfies all current filters.
 */

Demo.prototype.itemPassesFilters = function (element) {
  var industry = this.filters.industry;
  var tag = this.filters.tag;
  var formats = this.filters.format;

  var ind = element.getAttribute('data-industry');
  var form = element.getAttribute('data-format');
  var tags = element.getAttribute('data-category');

  // If there are active shape filters and this shape is not in that array.
  if (industry.length > 0 && !industry.includes(ind)) {
    return false;
  }

  // If there are active color filters and this color is not in that array.
  if (tag.length > 0 && !tag.includes(tags)) {
    return false;
  }

  if (formats.length > 0 && !formats.includes(form)) {
    return false;
  }

  return true;
};

// function removeStyle() {
//   const item = Array.from(document.querySelectorAll('.shuffle-item'));
//   item.map((item) => {
//     item.removeAttribute('style');
//     console.log(item);
//   });
// }

document.addEventListener('DOMContentLoaded', function () {
  window.demo = new Demo(document.querySelector('.js-shuffle'));
  // removeStyle();
});
