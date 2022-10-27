import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import ROUTES from "../../../src/config/routes";
import PlayerService from "../../../src/services/PlayerService";
import TeamService from "../../../src/services/TeamService";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SaveIcon from '@mui/icons-material/Save';
import { Button } from "@mui/material";

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
          <Button variant="contained" color="warning" size="small">
            <ArrowBackIcon fontSize="small" /> Cancelar
          </Button>
        </Link>
      </p>

      <form onSubmit={handleSubmit((data) => updatePlayer(data))}>
        <div className="field">
          <label>Name: </label>
          <input {...register("name", { required: true })} defaultValue={player.name} />
          {errors.name && <p>name is required.</p>}
        </div>

        <div className="field">
          <label>Age: </label>
          <input {...register("age", { required: true })} defaultValue={player.age} />
          {errors.age && <p>age is required.</p>}
        </div>

        <div className="field">
          <label>Height: </label>
          <input {...register("height", { required: true })} defaultValue={player.height} />
          {errors.height && <p>height is required.</p>}
        </div>

        <div className="field">
          <label>Position: </label>
          <input {...register("position", { required: true })} defaultValue={player.position} />
          {errors.position && <p>Position is required.</p>}
        </div>

        <div className="field">
          <label>Best Foot: </label>
          <input {...register("foot", { required: true })} defaultValue={player.foot} />
          {errors.foot && <p>Best Foor is required.</p>}
        </div>

        <div className="field">
          <label>Team: </label>
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
        <Button type="submit" variant="contained" color="success" size="small">
          <SaveIcon fontSize="small" /> Salvar
        </Button>
      </form>
    </>
  );
}

export default EditPlayer;
