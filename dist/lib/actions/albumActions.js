"use strict";
'use server';
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
exports.getRecipeImagesForAlbum = getRecipeImagesForAlbum;
exports.updateAlbumCoverWithUrl = updateAlbumCoverWithUrl;
exports.updateAlbumCoverWithUpload = updateAlbumCoverWithUpload;
exports.removeAlbumCover = removeAlbumCover;
exports.renameAlbum = renameAlbum;
require("server-only");
var prisma_1 = require("@/lib/prisma"); // Use named import
var next_1 = require("next-auth/next"); // Import getServerSession
var auth_1 = require("@/lib/auth"); // Import authOptions configuration
var zod_1 = require("zod"); // Import Zod
var client_1 = require("@prisma/client"); // Import Album type and Prisma namespace
var blob_1 = require("@vercel/blob"); // Import Vercel Blob upload function
/**
 * Fetches the image URLs of recipes contained within a specific album owned by the current user.
 * @param albumId The ID of the album.
 * @returns A promise that resolves to an array of recipe image URLs or throws an error.
 */
function getRecipeImagesForAlbum(albumId) {
    return __awaiter(this, void 0, void 0, function () {
        var session, userId, albumWithRecipes, imageUrls, error_1;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, (0, next_1.getServerSession)(auth_1.authOptions)];
                case 1:
                    session = _b.sent();
                    userId = (_a = session === null || session === void 0 ? void 0 : session.user) === null || _a === void 0 ? void 0 : _a.id;
                    if (!userId) {
                        throw new Error('User not authenticated');
                    }
                    if (!albumId) {
                        throw new Error('Album ID is required');
                    }
                    _b.label = 2;
                case 2:
                    _b.trys.push([2, 4, , 5]);
                    return [4 /*yield*/, prisma_1.prisma.album.findUnique({
                            where: {
                                id: albumId,
                                userId: userId, // Ensure the user owns the album
                            },
                            select: {
                                recipes: {
                                    select: {
                                        recipe: {
                                            select: {
                                                imageUrl: true, // Select only the image URL from the recipe
                                            },
                                        },
                                    },
                                },
                            },
                        })];
                case 3:
                    albumWithRecipes = _b.sent();
                    if (!albumWithRecipes) {
                        throw new Error('Album not found or user does not have access');
                    }
                    imageUrls = albumWithRecipes.recipes
                        // Add explicit type to map parameter
                        .map(function (recipeRelation) { return recipeRelation.recipe.imageUrl; })
                        // Add explicit type to filter parameter
                        .filter(function (url) { return !!url; });
                    // Optional: Remove duplicate image URLs if recipes share images
                    return [2 /*return*/, Array.from(new Set(imageUrls))];
                case 4:
                    error_1 = _b.sent();
                    console.error("Error fetching recipe images for album:", error_1);
                    // Re-throw or return a more specific error structure
                    if (error_1 instanceof Error) {
                        throw new Error("Failed to fetch recipe images: ".concat(error_1.message));
                    }
                    throw new Error('An unknown error occurred while fetching recipe images.');
                case 5: return [2 /*return*/];
            }
        });
    });
}
// Zod schema for updating cover with URL
var UpdateAlbumCoverUrlSchema = zod_1.z.object({
    albumId: zod_1.z.string().cuid({ message: 'Invalid Album ID format' }), // Use .uuid() if your IDs are UUIDs
    imageUrl: zod_1.z.string().url({ message: 'Invalid image URL format' }),
});
/**
 * Updates the cover image URL for a specific album owned by the current user using a pre-existing URL.
 * @param albumId The ID of the album to update.
 * @param imageUrl The new image URL to set as the cover.
 * @returns A promise that resolves to the updated Album object or throws an error.
 */
function updateAlbumCoverWithUrl(albumId, imageUrl) {
    return __awaiter(this, void 0, void 0, function () {
        var validationResult, errorMessage, session, userId, updatedAlbum, error_2;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    validationResult = UpdateAlbumCoverUrlSchema.safeParse({ albumId: albumId, imageUrl: imageUrl });
                    if (!validationResult.success) {
                        errorMessage = validationResult.error.errors.map(function (e) { return e.message; }).join(', ');
                        throw new Error("Input validation failed: ".concat(errorMessage));
                    }
                    return [4 /*yield*/, (0, next_1.getServerSession)(auth_1.authOptions)];
                case 1:
                    session = _b.sent();
                    userId = (_a = session === null || session === void 0 ? void 0 : session.user) === null || _a === void 0 ? void 0 : _a.id;
                    if (!userId) {
                        throw new Error('User not authenticated');
                    }
                    _b.label = 2;
                case 2:
                    _b.trys.push([2, 4, , 5]);
                    return [4 /*yield*/, prisma_1.prisma.album.update({
                            where: {
                                // Use validated data and ensure user owns the album
                                id: validationResult.data.albumId,
                                userId: userId, // CRITICAL: Ensures user owns the album
                            },
                            data: {
                                coverImage: validationResult.data.imageUrl, // Use validated imageUrl and correct field name
                            },
                        })];
                case 3:
                    updatedAlbum = _b.sent();
                    // Return the updated album object
                    return [2 /*return*/, updatedAlbum];
                case 4:
                    error_2 = _b.sent();
                    console.error("Error updating album cover URL:", error_2);
                    // Handle specific Prisma error for record not found (covers album not found OR wrong user)
                    if (error_2 instanceof client_1.Prisma.PrismaClientKnownRequestError && error_2.code === 'P2025') {
                        throw new Error('Album not found or user does not have access.');
                    }
                    // Re-throw other errors
                    if (error_2 instanceof Error) {
                        throw new Error("Failed to update album cover: ".concat(error_2.message));
                    }
                    throw new Error('An unknown error occurred while updating album cover.');
                case 5: return [2 /*return*/];
            }
        });
    });
}
// --- Start of Upload Function ---
// Zod schema for validating album ID during upload
var UploadAlbumCoverSchema = zod_1.z.object({
    albumId: zod_1.z.string().cuid({ message: 'Invalid Album ID format' }), // Or .uuid() / .nonempty()
});
// Define allowed image types and max size (e.g., 2MB)
var ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
var MAX_IMAGE_SIZE_MB = 2;
var MAX_IMAGE_SIZE_BYTES = MAX_IMAGE_SIZE_MB * 1024 * 1024;
/**
 * Handles uploading a new cover image file for a specific album owned by the current user
 * and updates the album's coverImageUrl.
 * @param albumId The ID of the album to update.
 * @param formData The FormData object containing the image file under the key 'coverImageFile'.
 * @returns A promise that resolves to the updated Album object or throws an error.
 */
function updateAlbumCoverWithUpload(albumId, formData) {
    return __awaiter(this, void 0, void 0, function () {
        var albumIdValidation, errorMessage, validatedAlbumId, session, userId, file, blobUrl, fileExtension, blobPath, blob, uploadError_1, updatedAlbum, dbError_1;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    albumIdValidation = UploadAlbumCoverSchema.safeParse({ albumId: albumId });
                    if (!albumIdValidation.success) {
                        errorMessage = albumIdValidation.error.errors.map(function (e) { return e.message; }).join(', ');
                        throw new Error("Invalid Album ID: ".concat(errorMessage));
                    }
                    validatedAlbumId = albumIdValidation.data.albumId;
                    return [4 /*yield*/, (0, next_1.getServerSession)(auth_1.authOptions)];
                case 1:
                    session = _b.sent();
                    userId = (_a = session === null || session === void 0 ? void 0 : session.user) === null || _a === void 0 ? void 0 : _a.id;
                    if (!userId) {
                        throw new Error('User not authenticated');
                    }
                    file = formData.get('coverImageFile');
                    if (!file) {
                        throw new Error('No image file provided.');
                    }
                    if (!(file instanceof File)) {
                        throw new Error('Invalid file data provided.');
                    }
                    if (!file.name || file.size === 0) {
                        throw new Error('Invalid file (missing name or size).');
                    }
                    if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
                        throw new Error("Invalid file type. Allowed types: ".concat(ALLOWED_IMAGE_TYPES.join(', ')));
                    }
                    if (file.size > MAX_IMAGE_SIZE_BYTES) {
                        throw new Error("File size exceeds the limit of ".concat(MAX_IMAGE_SIZE_MB, "MB."));
                    }
                    blobUrl = '';
                    _b.label = 2;
                case 2:
                    _b.trys.push([2, 4, , 5]);
                    fileExtension = file.name.split('.').pop() || 'png';
                    blobPath = "albums/".concat(validatedAlbumId, "/cover-").concat(Date.now(), ".").concat(fileExtension);
                    return [4 /*yield*/, (0, blob_1.put)(blobPath, file, {
                            access: 'public',
                            // Add cache control headers if desired, e.g., for 1 year
                            // cacheControlMaxAge: 31536000,
                        })];
                case 3:
                    blob = _b.sent();
                    blobUrl = blob.url; // Get the public URL
                    return [3 /*break*/, 5];
                case 4:
                    uploadError_1 = _b.sent();
                    console.error("Error uploading file to Vercel Blob:", uploadError_1);
                    throw new Error('Failed to upload cover image.');
                case 5:
                    // 5. Update Database
                    if (!blobUrl) {
                        throw new Error('Failed to get URL after upload.'); // Should not happen if put() succeeds
                    }
                    _b.label = 6;
                case 6:
                    _b.trys.push([6, 8, , 9]);
                    return [4 /*yield*/, prisma_1.prisma.album.update({
                            where: {
                                id: validatedAlbumId,
                                userId: userId, // CRITICAL: Ensure user owns the album
                            },
                            data: {
                                coverImage: blobUrl, // Save the Vercel Blob URL using the correct field name
                            },
                        })];
                case 7:
                    updatedAlbum = _b.sent();
                    return [2 /*return*/, updatedAlbum];
                case 8:
                    dbError_1 = _b.sent();
                    console.error("Error updating album cover URL in DB:", dbError_1);
                    // Attempt to delete the uploaded blob if DB update fails (best effort)
                    // Requires importing 'del' from '@vercel/blob'
                    // try {
                    //     await del(blobUrl);
                    //     console.log(`Deleted orphaned blob: ${blobUrl}`);
                    // } catch (deleteError) {
                    //     console.error("Failed to delete orphaned blob:", deleteError);
                    // }
                    if (dbError_1 instanceof client_1.Prisma.PrismaClientKnownRequestError && dbError_1.code === 'P2025') {
                        throw new Error('Album not found or user does not have access.');
                    }
                    if (dbError_1 instanceof Error) {
                        throw new Error("Failed to update database: ".concat(dbError_1.message));
                    }
                    throw new Error('An unknown error occurred while updating the database.');
                case 9: return [2 /*return*/];
            }
        });
    });
}
// --- End of Upload Function ---
// --- Start Remove Cover Function --- 
// Zod schema for validating album ID during removal
var RemoveAlbumCoverSchema = zod_1.z.object({
    albumId: zod_1.z.string().cuid({ message: 'Invalid Album ID format' }),
});
/**
 * Removes the cover image URL (sets it to null) for a specific album
 * owned by the current user.
 *
 * @param albumId The ID of the album to update.
 * @returns A promise that resolves when the operation is complete or throws an error.
 */
function removeAlbumCover(albumId) {
    return __awaiter(this, void 0, void 0, function () {
        var validationResult, errorMessage, validatedAlbumId, session, userId, dbError_2;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    validationResult = RemoveAlbumCoverSchema.safeParse({ albumId: albumId });
                    if (!validationResult.success) {
                        errorMessage = validationResult.error.errors.map(function (e) { return e.message; }).join(', ');
                        throw new Error("Invalid Album ID: ".concat(errorMessage));
                    }
                    validatedAlbumId = validationResult.data.albumId;
                    return [4 /*yield*/, (0, next_1.getServerSession)(auth_1.authOptions)];
                case 1:
                    session = _b.sent();
                    userId = (_a = session === null || session === void 0 ? void 0 : session.user) === null || _a === void 0 ? void 0 : _a.id;
                    if (!userId) {
                        throw new Error('User not authenticated');
                    }
                    _b.label = 2;
                case 2:
                    _b.trys.push([2, 4, , 5]);
                    return [4 /*yield*/, prisma_1.prisma.album.update({
                            where: {
                                id: validatedAlbumId,
                                userId: userId, // CRITICAL: Ensure user owns the album
                            },
                            data: {
                                coverImage: null, // Set cover image to null
                            },
                        })];
                case 3:
                    _b.sent();
                    console.log("Removed cover image for album ".concat(validatedAlbumId));
                    return [3 /*break*/, 5];
                case 4:
                    dbError_2 = _b.sent();
                    console.error("Error removing album cover URL in DB:", dbError_2);
                    if (dbError_2 instanceof client_1.Prisma.PrismaClientKnownRequestError && dbError_2.code === 'P2025') {
                        // Record to update not found (could be wrong albumId or wrong user)
                        throw new Error('Album not found or user does not have access.');
                    }
                    if (dbError_2 instanceof Error) {
                        throw new Error("Failed to remove cover image: ".concat(dbError_2.message));
                    }
                    throw new Error('An unknown error occurred while removing the cover image.');
                case 5: return [2 /*return*/];
            }
        });
    });
}
// --- End Remove Cover Function ---
// --- Start Rename Album Function ---
var RenameAlbumSchema = zod_1.z.object({
    albumId: zod_1.z.string().cuid({ message: 'Invalid Album ID format' }),
    newName: zod_1.z.string().min(1, { message: 'Album name cannot be empty' }).max(100, { message: 'Album name cannot exceed 100 characters' }),
});
/**
 * Renames a specific album owned by the current user.
 *
 * @param albumId The ID of the album to rename.
 * @param newName The new name for the album.
 * @returns A promise that resolves to the updated Album object or throws an error.
 */
function renameAlbum(albumId, newName) {
    return __awaiter(this, void 0, void 0, function () {
        var validationResult, errorMessage, _a, validatedAlbumId, validatedNewName, session, userId, updatedAlbum, dbError_3;
        var _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    validationResult = RenameAlbumSchema.safeParse({ albumId: albumId, newName: newName });
                    if (!validationResult.success) {
                        errorMessage = validationResult.error.errors.map(function (e) { return e.message; }).join(', ');
                        throw new Error("Input validation failed: ".concat(errorMessage));
                    }
                    _a = validationResult.data, validatedAlbumId = _a.albumId, validatedNewName = _a.newName;
                    return [4 /*yield*/, (0, next_1.getServerSession)(auth_1.authOptions)];
                case 1:
                    session = _d.sent();
                    userId = (_b = session === null || session === void 0 ? void 0 : session.user) === null || _b === void 0 ? void 0 : _b.id;
                    if (!userId) {
                        throw new Error('User not authenticated');
                    }
                    _d.label = 2;
                case 2:
                    _d.trys.push([2, 4, , 5]);
                    return [4 /*yield*/, prisma_1.prisma.album.update({
                            where: {
                                // Ensure user owns the album they are trying to update
                                id: validatedAlbumId,
                                userId: userId,
                            },
                            data: {
                                name: validatedNewName,
                            },
                        })];
                case 3:
                    updatedAlbum = _d.sent();
                    console.log("Renamed album ".concat(validatedAlbumId, " to \"").concat(validatedNewName, "\""));
                    return [2 /*return*/, updatedAlbum];
                case 4:
                    dbError_3 = _d.sent();
                    console.error("Error renaming album in DB:", dbError_3);
                    if (dbError_3 instanceof client_1.Prisma.PrismaClientKnownRequestError) {
                        // Handle unique constraint violation (duplicate name for the same user)
                        if (dbError_3.code === 'P2002' && ((_c = dbError_3.meta) === null || _c === void 0 ? void 0 : _c.target) === 'Album_userId_name_key') {
                            throw new Error('An album with this name already exists.');
                        }
                        // Handle record not found (wrong albumId or wrong user)
                        if (dbError_3.code === 'P2025') {
                            throw new Error('Album not found or user does not have access.');
                        }
                    }
                    // Handle other potential errors
                    if (dbError_3 instanceof Error) {
                        throw new Error("Failed to rename album: ".concat(dbError_3.message));
                    }
                    throw new Error('An unknown error occurred while renaming the album.');
                case 5: return [2 /*return*/];
            }
        });
    });
}
// --- End Rename Album Function ---
