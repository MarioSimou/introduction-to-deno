import { getDatabase } from "../utils/dbConnection.ts";
import {
  BadRequest,
  HTTPResponse,
  NotFound,
  Ok,
  StatusCode,
} from "../types/HTTPResponse.ts";
import Pokemon from "../types/Pokemon.ts";

export default ({ params, response }: { params: any; response: any }) => {
  try {
    const { id } = params;
    if (!id) {
      throw BadRequest("Invalid request parameters");
    }

    const db = getDatabase();
    const [pokemon]: Array<Pokemon> = [
      ...db.query(
        "SELECT id,name,category,height,weight from pokemons WHERE id=?",
        id,
      ).asObjects(),
    ];

    if (!pokemon) {
      throw NotFound("Pokemon not found");
    }

    response.body = Ok(pokemon);
    response.status = StatusCode.Ok;
  } catch (e) {
    const r = e instanceof HTTPResponse ? e : BadRequest(e.message);

    response.body = r;
    response.status = r.status;
  }
};
