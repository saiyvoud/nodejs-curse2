import express from "express";
import BannerController from "../controller/banner.controller.js";
import UserController from "../controller/user.controller.js";
import CategoryController from "../controller/category.controller.js";
import BookController from "../controller/book.controller.js";
import AddressController from "../controller/address.controller.js";
import { auth, auth_admin } from "../middleware/auth.js";
import OrderController from "../controller/order.controller.js";
import FavoriteController from "../controller/favorite.controller.js";
import multer from "multer";
const upload = multer()
const router = express.Router();
// ------ auth -----
const user = "/user"
router.get(`${user}/getOne/:userId`,auth,UserController.getOne);
router.get(`${user}/getAll`,auth,UserController.getAll);
router.post(`${user}/register`,UserController.register);
router.post(`${user}/login`,UserController.login);
router.put(`${user}/forget`,UserController.forgerPassword);
router.post(`${user}/refreshToken`,auth,auth_admin,UserController.refreshToken);
router.put(`${user}/updateProfile/:userId`,auth,UserController.updateProfile);
router.put(`${user}/updateProfileImage/:userId`,auth,UserController.updateProfileImage);
router.put(`${user}/changePassword/:userId`,auth,UserController.changPassword);
router.put(`${user}/updateProfileImageToServer/:userId`,auth,UserController.updateProfileImageToServer);
// -------- banner --------
const banner = "/banner";
router.get(`${banner}/getOne/:bannerId`,auth,BannerController.getOne);
router.get(`${banner}/getAll`,auth,BannerController.getAll);
router.post(`${banner}/insert`,auth,BannerController.insert);
router.put(`${banner}/update/:bannerId`,auth,BannerController.updateBanner);
router.put(`${banner}/delete/:bannerId`,auth,BannerController.deleteBanner);
// ---------- category --------
const category = "/category";
router.get(`${category}/getOne/:categoryId`,auth,CategoryController.getOne);
router.get(`${category}/getAll`,auth,CategoryController.getAll);
router.post(`${category}/insert`,auth,CategoryController.insert);
router.put(`${category}/update/:categoryId`,auth,CategoryController.updateCategory);
router.put(`${category}/delete/:categoryId`,auth,CategoryController.deleteCategory);
// ----------- book ---------
const book = "/book";
router.get(`${book}/getOne/:bookId`,auth,BookController.getOne);
router.get(`${book}/getByCategory/:categoryId`,auth,BookController.getByCategory);
router.get(`${book}/getByCategoryLimit/:categoryId`,auth,BookController.getByCategoryLimit);
router.get(`${book}/search`,auth,BookController.searchBook);
router.get(`${book}/getAll`,auth,BookController.getAll);
router.post(`${book}/insert`,auth,BookController.insert);
router.put(`${book}/update/:bookId`,auth,BookController.updateBook);
router.put(`${book}/delete/:bookId`,auth,BookController.deleteBook);
// ---------- address ------
const address = "/address";
router.get(`${address}/getOne/:addressId`,auth,AddressController.getOne);
router.get(`${address}/getByUser/:userId`,auth,AddressController.getByUser);
router.get(`${address}/getAll`,auth,AddressController.getAll);
router.post(`${address}/insert`,auth,AddressController.insert);
router.put(`${address}/update/:addressId`,auth,AddressController.updateAddress);
router.put(`${address}/delete/:addressId`,auth,AddressController.deleteAddress);
// ---------- order -------
const order = "/order";
router.get(`${order}/getOne/:orderId`,auth,OrderController.getOne);
router.get(`${order}/getByUser/:userId`,auth,OrderController.getByUser);
router.get(`${order}/getAll`,auth,OrderController.getAll);
router.post(`${order}/insert`,auth,OrderController.insert);
router.put(`${order}/updateStatus/:orderId`,auth,OrderController.updateOrderStatus);
router.put(`${order}/delete/:orderId`,auth,OrderController.deleteOrder);
// ---------- favorite -------
const favorite = "/favorite";
router.get(`${favorite}/getByBook/:bookId`,auth,FavoriteController.getByBookID);
router.get(`${favorite}/getByUser/:userId`,auth,FavoriteController.getByUser);
router.get(`${favorite}/getAll`,auth,FavoriteController.getAll);
router.post(`${favorite}/insert`,auth,FavoriteController.insert);
router.put(`${favorite}/updateStatus/:favoriteId`,auth,FavoriteController.updateFavoriteStatus);
router.put(`${favorite}/delete/:favoriteId`,auth,FavoriteController.deleteFavorite);
export default router;