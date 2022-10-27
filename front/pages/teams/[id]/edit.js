import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import ROUTES from "../../../src/config/routes";
import TeamService from "../../../src/services/TeamService";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Button } from "@mui/material";
import SaveIcon from '@mui/icons-material/Save';


function EditTeam() {
  const router = useRouter();
  const { id } = router.query;
  const [team, setTeam] = useState([]);

  useEffect(() => {
    TeamService.getById(id).then((data) => {
      setTeam(data)
    })
  }, [id])

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const updateTeam = (team) => {
    TeamService.update(id, team).then((data) => {
      router.push(ROUTES.teams.list)
      toast.success(`Team successfully updated!`)
    }).catch((e) => {
      toast.error(`Erro when updating team: ${e.message}`)
    })
  }

  if (!team) return `Carregando...`

  return (
    <>
      <p>Página de Edição do time: {id}</p>
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

      <form onSubmit={handleSubmit((data) => updateTeam(data))}>
        <div className="field">
          <label>Name</label>
          <input {...register("name", { required: true })} defaultValue={team.name} />
          {errors.name && <p>name is required.</p>}
        </div>

        <div className="field">
          <label>Country</label>
          <input {...register("country", { required: true })} defaultValue={team.country} />
          {errors.country && <p>country is required.</p>}
        </div>

        <Button type="submit" variant="contained" color="success" size="small">
          <SaveIcon fontSize="small" /> Salvar
        </Button>
      </form>
    </>
  );
}

export default EditTeam;
