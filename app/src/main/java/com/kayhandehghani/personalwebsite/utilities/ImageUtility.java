package com.kayhandehghani.personalwebsite.utilities;

import java.awt.Color;
import java.awt.image.BufferedImage;

public class ImageUtility {

	// Returns the grayscale of the original image
	public static BufferedImage makeGrayScale(BufferedImage image) {
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
	
}
