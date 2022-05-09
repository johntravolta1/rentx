"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UploadCarImageUseCase = void 0;

var _tsyringe = require("tsyringe");

var _IStorageProvider = require("../../../../shared/container/providers/StorageProvider/IStorageProvider");

var _ICarsImagesRepository = require("../../repositories/ICarsImagesRepository");

var _dec, _dec2, _dec3, _dec4, _dec5, _class;

let UploadCarImageUseCase = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('CarsImageRepository')(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('StorageProvider')(target, undefined, 1);
}, _dec4 = Reflect.metadata("design:type", Function), _dec5 = Reflect.metadata("design:paramtypes", [typeof _ICarsImagesRepository.ICarsImageRepository === "undefined" ? Object : _ICarsImagesRepository.ICarsImageRepository, typeof _IStorageProvider.IStorageProvider === "undefined" ? Object : _IStorageProvider.IStorageProvider]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = class UploadCarImageUseCase {
  constructor(carsImageRepository, storageProvider) {
    this.carsImageRepository = carsImageRepository;
    this.storageProvider = storageProvider;
  }

  async execute({
    car_id,
    images_name
  }) {
    images_name.map(async i => {
      await this.carsImageRepository.create(car_id, i);
      await this.storageProvider.save(i, 'cars');
    });
  }

}) || _class) || _class) || _class) || _class) || _class);
exports.UploadCarImageUseCase = UploadCarImageUseCase;