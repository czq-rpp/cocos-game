/*
 * @Author: zaccheus 
 * @Date: 2018-07-06 09:47:43 
 * @Last Modified by: zaccheus
 * @Last Modified time: 2018-07-06 10:35:45
 */

var BinarySearch = require("./binarySearch");
var Assert = require("assert");

describe('测试二分查找算法', function() {
  describe('测试传递null值', function() {
    it('必须返回-1', function() {
      var binarySearchInstance = new BinarySearch();
      var ok = binarySearchInstance.search(null, 0);
      Assert.equal(-1, ok);
    });
  });
  describe('测试传递undefined值', function() {
    it('必须返回-1', function() {
      var binarySearchInstance = new BinarySearch();
      var ok = binarySearchInstance.search(undefined, 0);
      Assert.equal(-1, ok);
    });
  });
  describe('测试传递非数组值', function() {
    it('必须返回-1', function() {
      var binarySearchInstance = new BinarySearch();
      var ok = binarySearchInstance.search("sadas", 0);
      Assert.equal(-1, ok);
    });
  });
  describe('测试传递数组，且能找到', function() {
    it('必须返回1', function() {
      var binarySearchInstance = new BinarySearch();
      var ok = binarySearchInstance.search([1,45,199,299,300,400], 299);
      Assert.equal(1, ok);
    });
  });
  describe('测试传递数组，且不能找到', function() {
    it('必须返回0', function() {
      var binarySearchInstance = new BinarySearch();
      var ok = binarySearchInstance.search([1,45,78,90,100], 91);
      Assert.equal(0, ok);
    });
  });
});