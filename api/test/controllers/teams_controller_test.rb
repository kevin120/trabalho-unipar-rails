require "test_helper"

class TeamsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @team = teams(:one)
  end

  test "should get index" do
    get api_teams_url, as: :json
    assert_response :success
  end

  test "should create team" do
    assert_difference("Team.count") do
      post api_teams_url, params: { team: { country: @team.country, name: @team.name } }, as: :json
    end

    assert_response :created
  end

  test "should show team" do
    get api_team_url(@team), as: :json
    assert_response :success
  end

  test "should update team" do
    patch api_team_url(@team), params: { team: { country: @team.country, name: @team.name } }, as: :json
    assert_response :success
  end

  test "should destroy team" do
    assert_difference("Team.count", -1) do
      delete api_team_url(@team), as: :json
    end

    assert_response :no_content
  end
end
