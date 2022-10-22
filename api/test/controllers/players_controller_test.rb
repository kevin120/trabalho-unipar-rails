require "test_helper"

class PlayersControllerTest < ActionDispatch::IntegrationTest
  setup do
    @player = players(:one)
  end

  test "should get index" do
    get api_players_url, as: :json
    assert_response :success
  end

  test "should create player" do
    assert_difference("Player.count") do
      post api_players_url, params: { 
        player: { 
        age: @player.age, 
        foot: @player.foot, 
        height: @player.height, 
        name: @player.name, 
        position: @player.position, 
        team_id: teams(:one).id, } }, as: :json
    end

    assert_response :created
  end

  test "should show player" do
    get api_player_url(@player), as: :json
    assert_response :success
  end

  test "should update player" do
    patch api_player_url(@player), params: { 
      player: { 
        age: @player.age, 
        foot: @player.foot, 
        height: @player.height, 
        name: @player.name, 
        position: @player.position, 
        team_id: teams(:one).id, } }, as: :json
    assert_response :success
  end

  test "should destroy player" do
    assert_difference("Player.count", -1) do
      delete api_player_url(@player), as: :json
    end

    assert_response :no_content
  end
end
