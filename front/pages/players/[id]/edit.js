import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import ROUTES from "../../../src/config/routes";
import PlayerService from "../../../src/services/PlayerService";
import TeamService from "../../../src/services/TeamService";

function EditPlayer() {
  const router = useRouter();
  const { id } = router.query;
  const [player, setPlayer] = useState(null);
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    PlayerService.getById(id).then((data) => {
      setPlayer(data)
    })
  }, [id])

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const updatePlayer = (player) => {
    PlayerService.update(id, player).then((data) => {
      router.push(ROUTES.players.list)
      toast.success(`Player successfully updated!`)
    }).catch((e) => {
      toast.error(`Erro when updating player: ${e.message}`)
    })
  }

  useEffect(() => {
    TeamService.getAll().then((data) => setTeams(data));
  }, []);

  if (!player || !teams.length) return `Carregando...`

  return (
    <>
      <p>Página de Edição do jogador: {id}</p>
      <p>
        <Link
          href={{
            pathname: ROUTES.players.list,
          }}
        >
          <a>Cancelar</a>
        </Link>
      </p>

      <form onSubmit={handleSubmit((data) => updatePlayer(data))}>
        <div className="field">
          <label>Title</label>
          <input {...register("title", { required: true })} defaultValue={player.title} />
          {errors.title && <p>title is required.</p>}
        </div>

        <div className="field">
          <label>Body</label>
          <input {...register("body", { required: true })} defaultValue={player.body} />
          {errors.body && <p>body is required.</p>}
        </div>

        <div className="field">
          <label>Team</label>
          <select {...register("team_id", { pattern: /\d/ })} defaultValue={player.team_id}>
            <option>Select Team</option>
            {teams.map((team) => {
              return (
                <option key={team.id} value={team.id}>
                  {team.name}
                </option>
              );
            })}
          </select>
          {errors.team_id && <p>Team is required.</p>}
        </div>

        {/* <div className="field">
          <label>Author</label>
          <select {...register("author_id", { pattern: /\d/ })} defaultValue={player.author_id}>
            <option>Select Author</option>
            {users.map((user) => {
              return (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              );
            })}
          </select>
          {errors.author_id && <p>Author is required.</p>}
        </div> */}

        <div className="field">
          <label>Published At</label>
          <input {...register("published_at", { required: true })} defaultValue={player.published_at} />
          {errors.published_at && <p>Published at is required.</p>}
        </div>

        <input type="submit" />
      </form>
    </>
  );
}

export default EditPlayer;