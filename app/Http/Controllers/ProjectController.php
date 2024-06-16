<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;
use App\Models\Project;
use App\Models\Task;
class ProjectController extends Controller
{
    
    public function store(Request $request)
    {

       
            $fields = $request->all();

            $errors = Validator::make($fields, [
                'name' => 'required',
                // 'status' => 'required',
                'startDate' => 'required',
                'endDate' => 'required',
            ]);

            if ($errors->fails()) {
                return response($errors->errors()->all(), 422);
            }

            $project = Project::create([
                'name' => $fields['name'],
                'startDate' => $fields['startDate'],
                'endDate' => $fields['endDate'],
                'status' => Project::NOT_STARTED,
                'slug' => Project::createSlug($fields['name'])

            ]);

            // TaskProgress::create([
            //     'projectId' => $project->id,
            //     'pinned_on_dashbaord' => TaskProgress::NOT_PINNED_ON_DASHBOARD,
            //     'progress' => TaskProgress::INITIAL_PROJECT_PERCENT
            // ]);

            // $count = Project::count();
            // NewProjectCreated::dispatch($count);

            return response(['message' => 'project created'], 200);
       
    }

}
