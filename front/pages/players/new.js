import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import ROUTES from "../../src/config/routes";
import PlayerService from "../../src/services/PlayerService";
import TeamService from "../../src/services/TeamService";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Button } from "@mui/material";
import SaveIcon from '@mui/icons-material/Save';

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
          <Button variant="contained" color="warning" size="small">
            <ArrowBackIcon fontSize="small" /> Cancelar
          </Button>
        </Link>
      </p>

      <form onSubmit={handleSubmit((data) => insertPlayer(data))}>
        <div className="field">
          <label>Name: </label>
          <input {...register("name", { required: true })} />
          {errors.name && <p>name is required.</p>}
        </div>

        <div className="field">
          <label>Age: </label>
          <input {...register("age", { required: true })} />
          {errors.age && <p>age is required.</p>}
        </div>

        <div className="field">
          <label>Height: </label>
          <input {...register("height", { required: true })} />
          {errors.height && <p>height is required.</p>}
        </div>

        <div className="field">
          <label>Position: </label>
          <input {...register("position", { required: true })} />
          {errors.position && <p>Position is required.</p>}
        </div>

        <div className="field">
          <label>Best Foot: </label>
          <input {...register("foot", { required: true })} />
          {errors.foot && <p>Best Foor is required.</p>}
        </div>

        <div className="field">
          <label>Team: </label>
          <select {...register("team_id", { pattern: /\d/ })}>
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

export default NewPlayer;
