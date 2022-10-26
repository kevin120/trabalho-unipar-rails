import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ROUTES from "../../../src/config/routes";
import PlayerService from "../../../src/services/PlayerService";

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
          <a>Voltar</a>
        </Link>
      </p>

      <dl>
        <dt>ID</dt>
        <dd>{player.id}</dd>

        {/* <dt>Title</dt>
        <dd>{player.title}</dd>

        <dt>Author</dt>
        <dd>{player.author.name}</dd>

        <dt>Category</dt>
        <dd>{player.category.name}</dd>

        <dt>Body</dt>
        <dd>{player.body}</dd>

        <dt>Created At</dt>
        <dd>{player.created_at}</dd> */}
      </dl>

    </>
  );
}

export default ShowPlayer;