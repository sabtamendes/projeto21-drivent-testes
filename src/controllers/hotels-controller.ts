import { AuthenticatedRequest } from "@/middlewares";
import hotelsService from "@/services/hotel-service";
import { Response } from "express";
import httpStatus from "http-status";

export async function getHotels(req: AuthenticatedRequest, res: Response) {
  const userId = req.userId as number;

  try {
    const hotel = await hotelsService.getHotels(userId);

    return res.status(httpStatus.OK).send(hotel);

  } catch (error) {
    switch (error.name) {
      case "NotFoundError":
        return res.sendStatus(httpStatus.NOT_FOUND);
      case "UnauthorizedError":
        return res.sendStatus(httpStatus.UNAUTHORIZED);
      case "PaymentRequired":
        return res.sendStatus(httpStatus.PAYMENT_REQUIRED);
      default:
        return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}


export async function getHotelsById(req: AuthenticatedRequest, res: Response) {
  const hotelId = Number(req.query.hotelId) as unknown as number;

  try {
    const hotelRooms = await hotelsService.getHotelsById(hotelId);

    return res.status(httpStatus.OK).send(hotelRooms);

  } catch (error) {
    switch (error.name) {
      case "NotFoundError":
        return res.status(httpStatus.NOT_FOUND).send({ message: error.message });
      case "UnauthorizedError":
        return res.status(httpStatus.UNAUTHORIZED).send({ message: error.message });
      default:
        return res.status(httpStatus.BAD_REQUEST).send({ message: error.message });
    }
  }
}
