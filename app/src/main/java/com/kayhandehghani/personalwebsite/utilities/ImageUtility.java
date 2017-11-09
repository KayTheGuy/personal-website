package com.kayhandehghani.personalwebsite.utilities;

import java.awt.Color;
import java.awt.image.BufferedImage;

public class ImageUtility {
	
	public static BufferedImage applyFilter(BufferedImage image, int effectNumber) {
		switch (effectNumber) {
		case 0:
			return grayScale(image);
		case 1:
			return invert(image);
		default:
			return image;
		}
	}

	// Returns the grayscale of the original image
	private static BufferedImage grayScale(BufferedImage image) {
		int width = image.getWidth();
		int height = image.getHeight();
		BufferedImage resultImage = new BufferedImage(width, height, image.getType());

		for (int y = 0; y < height; y++) {
			for (int x = 0; x < width; x++) {
				Color c = new Color(image.getRGB(x, y));
				int red = (int) (c.getRed() * 0.299);
				int green = (int) (c.getGreen() * 0.587);
				int blue = (int) (c.getBlue() * 0.114);
				int sum = red + green + blue;
				Color newColor = new Color(sum, sum, sum);
				resultImage.setRGB(x, y, newColor.getRGB());
			}
		}
		return resultImage;
	}

	// invert the image
	private static BufferedImage invert(BufferedImage image) {
		int width = image.getWidth();
		int height = image.getHeight();
		BufferedImage resultImage = new BufferedImage(width, height, image.getType());
		for (int y = 0; y < height; y++) {
			for (int x = 0; x < width; x++) {
				Color c = new Color(image.getRGB(x, y));
				int red = (int) (255 - c.getRed());
				int green = (int) (255 - c.getGreen());
				int blue = (int) (255 - c.getBlue());

				Color newColor = new Color(red, green, blue);
				resultImage.setRGB(x, y, newColor.getRGB());
			}
		}
		return resultImage;
	}

}
