import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import ROUTES from "../../src/config/routes";
import TeamService from "../../src/services/TeamService";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SaveIcon from '@mui/icons-material/Save';
import { Button } from "@mui/material";

function NewTeam() {
  const router = useRouter()
  const [teams, setTeams] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const insertTeam = (team) => {
    TeamService.create(team).then((data) => {
      router.push(ROUTES.teams.list)
      toast.success(`Team successfully created!`)
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

      <form onSubmit={handleSubmit((data) => insertTeam(data))}>
        <div className="field">
          <label>Name</label>
          <input {...register("name", { required: true })}/>
          {errors.name && <p>name is required.</p>}
        </div>

        <div className="field">
          <label>Country</label>
          <input {...register("country", { required: true })}/>
          {errors.country && <p>country is required.</p>}
        </div>

        <Button type="submit" variant="contained" color="success" size="small">
          <SaveIcon fontSize="small" /> Salvar
        </Button>
      </form>
    </>
  );
}

export default NewTeam;
