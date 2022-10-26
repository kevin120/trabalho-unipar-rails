import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import ROUTES from "../../../src/config/routes";
import TeamService from "../../../src/services/TeamService";


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
      <p>Página de Edição do jogador: {id}</p>
      <p>
        <Link
          href={{
            pathname: ROUTES.teams.list,
          }}
        >
          <a>Cancelar</a>
        </Link>
      </p>

      <form onSubmit={handleSubmit((data) => updateTeam(data))}>
        <div className="field">
          <label>Title</label>
          <input {...register("title", { required: true })} defaultValue={team.title} />
          {errors.title && <p>title is required.</p>}
        </div>

        <div className="field">
          <label>Body</label>
          <input {...register("body", { required: true })} defaultValue={team.body} />
          {errors.body && <p>body is required.</p>}
        </div>

        {/* <div className="field">
          <label>Team</label>
          <select {...register("team_id", { pattern: /\d/ })} defaultValue={team.id}>
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
        </div> */}

        {/* <div className="field">
          <label>Author</label>
          <select {...register("author_id", { pattern: /\d/ })} defaultValue={team.author_id}>
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
          <input {...register("published_at", { required: true })} defaultValue={team.published_at} />
          {errors.published_at && <p>Published at is required.</p>}
        </div>

        <input type="submit" />
      </form>
    </>
  );
}

export default EditTeam;
