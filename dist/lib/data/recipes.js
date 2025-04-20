"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRecipeById = getRecipeById;
require("server-only"); // Ensures this module only runs on the server
// Assume a shared Prisma client instance if you have one in lib/prisma.ts
var prisma_1 = require("@/lib/prisma"); // Correct import for prisma client
/**
 * Fetches a single recipe with its full details by ID.
 * Returns null if the recipe is not found or an error occurs.
 * @param id The CUID of the recipe.
 * @returns The detailed recipe data or null.
 */
function getRecipeById(id) {
    return __awaiter(this, void 0, void 0, function () {
        var recipe, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log("[Server Data] Fetching detailed recipe with ID: ".concat(id));
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, prisma_1.prisma.recipe.findUnique({
                            where: { id: id },
                            include: {
                                // --- MODIFIED INCLUDE BLOCK ---
                                ingredients: true,
                                instructions: {
                                    orderBy: {
                                        stepNumber: 'asc',
                                    },
                                },
                                nutritionFacts: true, // Include related nutrition facts
                                author: {
                                    select: {
                                        id: true,
                                        name: true,
                                        image: true,
                                    }
                                },
                                tags: true, // Include related tags
                                categories: true, // Include related categories
                                cuisines: true, // Include related cuisines
                                // Include other relations as needed by RecipeDetailModal here
                                // --- END MODIFIED INCLUDE BLOCK ---
                            },
                        })];
                case 2:
                    recipe = _a.sent();
                    if (!recipe) {
                        console.warn("[Server Data] Recipe not found for ID: ".concat(id));
                        return [2 /*return*/, null];
                    }
                    // Prisma's generated type with include should match RecipeDetailData if defined correctly
                    // The cast might not be strictly necessary but provides an extra layer of type safety
                    return [2 /*return*/, recipe];
                case 3:
                    error_1 = _a.sent();
                    console.error("[Server Data] Failed to fetch recipe ".concat(id, ":"), error_1);
                    // In production, consider more generic error handling or logging
                    return [2 /*return*/, null]; // Return null on error to be handled by the API route/component
                case 4: return [2 /*return*/];
            }
        });
    });
}
// Add other server-only data fetching functions here if needed
