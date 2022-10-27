import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ROUTES from "../../../src/config/routes";
import PlayerService from "../../../src/services/PlayerService";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Button } from "@mui/material";

function ShowPlayer() {
  const router = useRouter()
  const { id } = router.query

  const [player, setPlayer] = useState(null);

  useEffect(() => {
    PlayerService.getById(id).then((data) => {
      setPlayer(data)
    })
  }, [id])

  if (!player) return `Carregando...`

  return (
    <>
      <p>Exibindo o jogador: {id}</p>

      <p>
        <Link
          href={{
            pathname: ROUTES.players.list,
          }}
        >
          <Button variant="contained" color="warning" size="small">
            <ArrowBackIcon fontSize="small" /> Voltar
          </Button>
        </Link>
      </p>

      <dl>
        <dt>ID</dt>
        <dd>{player.id}</dd>

        <dt>Name</dt>
        <dd>{player.name}</dd>

        <dt>Age</dt>
        <dd>{player.age}</dd>

        <dt>Position</dt>
        <dd>{player.position}</dd>

        <dt>Best Foot</dt>
        <dd>{player.foot}</dd>

        <dt>Actual Team</dt>
        <dd>{player.team.name} ({player.team.country})</dd>
      </dl>

    </>
  );
}

export default ShowPlayer;