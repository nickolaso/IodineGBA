"use strict";
/*
 * This file is part of IodineGBA
 *
 * Copyright (C) 2012-2013 Grant Galitz
 *
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the GNU General Public License
 * version 2 as published by the Free Software Foundation.
 * The full license is available at http://www.gnu.org/licenses/gpl.html
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 */
function getInt8Array(size_t) {
	try {
		return new Int8Array(size_t);
	}
	catch (error) {
		return getArray(size_t);
	}
}
function getUint8Array(size_t) {
	try {
		return new Uint8Array(size_t);
	}
	catch (error) {
		return getArray(size_t);
	}
}
function getInt16Array(size_t) {
	try {
		return new Int16Array(size_t);
	}
	catch (error) {
		return getArray(size_t);
	}
}
function getUint16Array(size_t) {
	try {
		return new Uint16Array(size_t);
	}
	catch (error) {
		return getArray(size_t);
	}
}
function getUint16View(typed_array) {
	try {
		return new Uint16Array(typed_array.buffer);
	}
	catch (error) {
		return null;
	}
}
function getInt32Array(size_t) {
	try {
		return new Int32Array(size_t);
	}
	catch (error) {
		return getArray(size_t);
	}
}
function getUint32Array(size_t) {
	try {
		return new Uint32Array(size_t);
	}
	catch (error) {
		return getArray(size_t);
	}
}
function getFloat32Array(size_t) {
	try {
		return new Float32Array(size_t);
	}
	catch (error) {
		return getArray(size_t);
	}
}
function getArray(size_t) {
	var genericArray = [];
	for (var size_index = 0; size_index < size_t; ++size_index) {
		genericArray[size_index] = 0;
	}
    return genericArray;
}