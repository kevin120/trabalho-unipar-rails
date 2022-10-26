import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ROUTES from "../../../src/config/routes";
import TeamService from "../../../src/services/TeamService";

function ShowTeam() {
  const router = useRouter()
  const { id } = router.query

  const [team, setTeam] = useState(null);

  useEffect(() => {
    TeamService.getById(id).then((data) => {
      setTeam(data)
    })
  }, [id])

  if (!team) return `Carregando...`

  return (
    <>
      <p>Exibindo o jogador: {id}</p>

      <p>
        <Link
          href={{
            pathname: ROUTES.teams.list,
          }}
        >
          <a>Voltar</a>
        </Link>
      </p>

      <dl>
        <dt>ID</dt>
        <dd>{team.id}</dd>

        {/* <dt>Title</dt>
        <dd>{team.title}</dd>

        <dt>Author</dt>
        <dd>{team.author.name}</dd>

        <dt>Category</dt>
        <dd>{team.category.name}</dd>

        <dt>Body</dt>
        <dd>{team.body}</dd>

        <dt>Created At</dt>
        <dd>{team.created_at}</dd> */}
      </dl>

    </>
  );
}

export default ShowTeam;