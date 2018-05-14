"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var react_1 = require("react");
var observeElementSize_1 = require("./observeElementSize");
var ObserveSize = /** @class */ (function (_super) {
    __extends(ObserveSize, _super);
    function ObserveSize() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.sizeRef = function (el) {
            if (el) {
                observeElementSize_1.observeElementSize(el, _this.props.observerFn);
                _this.element = el;
            }
        };
        return _this;
    }
    ObserveSize.prototype.componentWillUnmount = function () {
        if (this.element) {
            observeElementSize_1.unobserveElementSize(this.element);
        }
    };
    ObserveSize.prototype.render = function () {
        return (react_1["default"].createElement("div", { ref: this.sizeRef }, this.props.children));
    };
    return ObserveSize;
}(react_1.Component));
exports["default"] = ObserveSize;
