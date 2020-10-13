import { getDatabase } from "../utils/dbConnection.ts";
import {
  BadRequest,
  HTTPResponse,
  NotFound,
  Ok,
  StatusCode,
} from "../types/HTTPResponse.ts";
import Pokemon from "../types/Pokemon.ts";

export default async (
  { params, request, response }: { request: any; params: any; response: any },
) => {
  try {
    const { id } = params;
    if (!id) {
      throw BadRequest("Invalid request parameters");
    }
    const { value } = request.body({ type: "json" });
    const body = await value;
    if (!body?.name && !body.category && !body?.height && !body?.weight) {
      throw BadRequest("Invalid body");
    }

    const db = getDatabase();
    const [oldPokemon]: Array<Pokemon> = [
      ...db.query(
        "SELECT name,category,height,weight FROM pokemons WHERE id=?",
        id,
      ).asObjects(),
    ];

    if (!oldPokemon) {
      throw NotFound("Pokemon not found");
    }

    const mergedBody: Pokemon = { ...oldPokemon, ...body };
    db.query(
      "UPDATE pokemons SET name=?,category=?,height=?,weight=? WHERE id=?",
      mergedBody.name,
      mergedBody.category,
      mergedBody.height,
      mergedBody.weight,
      id,
    ).return();

    const [pokemon]: Array<Pokemon> = [
      ...db.query(
        "SELECT id,name,category,height,weight FROM pokemons WHERE id=?",
        id,
      ).asObjects(),
    ];

    response.body = Ok(pokemon);
    response.status = StatusCode.Ok;
  } catch (e) {
    const r = e instanceof HTTPResponse ? e : BadRequest(e.message);

    response.body = r;
    response.status = r.status;
  }
};
