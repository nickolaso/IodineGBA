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
function GameBoyAdvanceColorEffectsRenderer() {
    this.alphaBlendAmountTarget1 = 0;
    this.alphaBlendAmountTarget2 = 0;
    this.effectsTarget1 = 0;
	this.colorEffectsType = 0;
	this.effectsTarget2 = 0;
	this.brightnessEffectAmount = 0;
}
GameBoyAdvanceColorEffectsRenderer.prototype.processOAMSemiTransparent = function (lowerPixel, topPixel) {
	if ((lowerPixel & this.effectsTarget2) != 0) {
		return this.alphaBlend(topPixel, lowerPixel);
	}
	else if ((topPixel & this.effectsTarget1) != 0) {
		switch (this.colorEffectsType) {
			case 2:
				return this.brightnessIncrease(topPixel);
			case 3:
				return this.brightnessDecrease(topPixel);
		}
	}
	return topPixel;
}
GameBoyAdvanceColorEffectsRenderer.prototype.process = function (lowerPixel, topPixel) {
	if ((topPixel & this.effectsTarget1) != 0) {
		switch (this.colorEffectsType) {
			case 1:
				if ((lowerPixel & this.effectsTarget2) != 0) {
					return this.alphaBlend(topPixel, lowerPixel);
				}
				break;
			case 2:
				return this.brightnessIncrease(topPixel);
			case 3:
				return this.brightnessDecrease(topPixel);
		}
	}
	return topPixel;
}
GameBoyAdvanceColorEffectsRenderer.prototype.alphaBlend = function (topPixel, lowerPixel) {
	var b1 = (topPixel >> 10) & 0x1F;
	var g1 = (topPixel >> 5) & 0x1F;
	var r1 = (topPixel & 0x1F);
	var b2 = (lowerPixel >> 10) & 0x1F;
	var g2 = (lowerPixel >> 5) & 0x1F;
	var r2 = lowerPixel & 0x1F;
	b1 *= this.alphaBlendAmountTarget1;
	g1 *= this.alphaBlendAmountTarget1;
	r1 *= this.alphaBlendAmountTarget1;
	b2 *= this.alphaBlendAmountTarget2;
	g2 *= this.alphaBlendAmountTarget2;
	r2 *= this.alphaBlendAmountTarget2;
	return (Math.min(b1 + b2, 0x1F) << 10) | (Math.min(g1 + g2, 0x1F) << 5) | Math.min(r1 + r2, 0x1F);
}
GameBoyAdvanceColorEffectsRenderer.prototype.brightnessIncrease = function (topPixel) {
	var b1 = (topPixel >> 10) & 0x1F;
	var g1 = (topPixel >> 5) & 0x1F;
	var r1 = (topPixel & 0x1F);
	b1 += (0x1F - b1) * this.brightnessEffectAmount;
	g1 += (0x1F - g1) * this.brightnessEffectAmount;
	r1 += (0x1F - r1) * this.brightnessEffectAmount;
	return (b1 << 10) | (g1 << 5) | r1;
}
GameBoyAdvanceColorEffectsRenderer.prototype.brightnessDecrease = function (topPixel) {
	var b1 = (topPixel >> 10) & 0x1F;
	var g1 = (topPixel >> 5) & 0x1F;
	var r1 = (topPixel & 0x1F);
	var decreaseMultiplier = 1 - this.brightnessEffectAmount;
	b1 *= decreaseMultiplier;
	g1 *= decreaseMultiplier;
	r1 *= decreaseMultiplier;
	return (b1 << 10) | (g1 << 5) | r1;
}