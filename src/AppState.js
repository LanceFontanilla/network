import { reactive } from 'vue'



// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  user: {},
  /** @type {import('./models/Account.js').Account} */
  account: {},

  /** @type {Post[]} */
  posts: [],

  /** @type {Post||null} */
  activePost: null,

  /**@type {Profile||null} */
  activeProfile: null,

  /** @type {Number} */
  pageNumber: 1,

  /** @type {Number} */
  totalPages: 1,

  /** @type {Number} */
  pageNumberById: 1,

  /** @type {Number} */
  totalPagesById: 1,

  /** @type {Flyer[]} */
  flyers: [],

  /**@type {String} */
  searchTerm: ''

})
