import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import ROUTES from "../../src/config/routes";
import PlayerService from "../../src/services/PlayerService";
import TeamService from "../../src/services/TeamService";

function NewPlayer() {
  const router = useRouter()
  const [teams, setTeams] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const insertPlayer = (player) => {
    PlayerService.create(player).then((data) => {
      router.push(ROUTES.players.list)
      toast.success(`Player successfully created!`)
    }).catch((e) => console.error(e))
  }

  useEffect(() => {
    TeamService.getAll().then((data) => setTeams(data))
  }, []);

  return (
    <>
      <p>Tela de Cadastro de Jogador</p>
      <p>
        <Link
          href={{
            pathname: ROUTES.players.list,
          }}
        >
          <a>Cancelar</a>
        </Link>
      </p>

      {/* <form onSubmit={handleSubmit((data) => insertPlayer(data))}>
        <div className="field">
          <label>Title</label>
          <input {...register("title", { required: true })} />
          {errors.title && <p>title is required.</p>}
        </div>

        <div className="field">
          <label>Body</label>
          <input {...register("body", { required: true })} />
          {errors.body && <p>body is required.</p>}
        </div>

        <div className="field">
          <label>Team</label>
          <select {...register("team_id", { pattern: /\d/ })}>
          <option>Select Team</option>
            {
              teams.map((team) => {
                return <option key={team.id} value={team.id}>{team.name}</option>
              })
            }
          </select>
          {errors.team_id && <p>Team is required.</p>}
        </div>

        <div className="field">
          <label>Published At</label>
          <input {...register("published_at", { required: true })} />
          {errors.published_at && <p>Published at is required.</p>}
        </div>

        <input type="submit" />
      </form> */}
    </>
  );
}

export default NewPlayer;
