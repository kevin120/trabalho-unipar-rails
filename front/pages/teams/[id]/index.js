import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ROUTES from "../../../src/config/routes";
import TeamService from "../../../src/services/TeamService";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Button } from "@mui/material";

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
      <p>Exibindo o Time: {id}</p>

      <p>
        <Link
          href={{
            pathname: ROUTES.teams.list,
          }}
        >
          <Button variant="contained" color="warning" size="small">
            <ArrowBackIcon fontSize="small" /> Voltar
          </Button>
        </Link>
      </p>

      <dl>
        <dt>ID</dt>
        <dd>{team.id}</dd>

        <dt>Name</dt>
        <dd>{team.name}</dd>

        <dt>Country</dt>
        <dd>{team.country}</dd>

        <dt>Players Count</dt>
        <dd>{team.players.length}</dd>

      </dl>

    </>
  );
}

export default ShowTeam;