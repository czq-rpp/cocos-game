/*
 * @Author: zaccheus 
 * @Date: 2018-07-06 09:05:47 
 * @Last Modified by: zaccheus
 * @Last Modified time: 2018-07-06 10:29:11
 */

class BinarySearch {
  constructor() {
    this.needSearchSortedArray = null;
    this.needFindVal = null;
  }
  /**
   * 
   * @param {*} fromIndex 
   * @param {*} toIndex 
   */
  searchScope(fromIndex, toIndex) {
    if(fromIndex > toIndex) {
      return 0;
    }
    var centerIndex = fromIndex + parseInt((toIndex - fromIndex) / 2);
    var centerVal = this.needSearchSortedArray[centerIndex];

    if(centerVal === this.needFindVal) {
      return 1;
    }

    if(centerVal < this.needFindVal) {
      return this.searchScope(centerIndex + 1, toIndex);
    }

    return this.searchScope(fromIndex, centerIndex - 1);
  }
  /**
   * 
   * @param {*} sortedArray 
   * @param {*} findVal 
   * @returns -1表示传递的值有问题  1表示找到元素了  0表示没有找到
   */
  search(sortedArray, findVal) {
    this.needSearchSortedArray = sortedArray;
    this.needFindVal = findVal;
    if (sortedArray === null || typeof sortedArray === "undefined" || !(sortedArray instanceof Array)) {
      return -1;
    }
    return this.searchScope(0, sortedArray.length - 1);
  }
}

module.exports = BinarySearch;